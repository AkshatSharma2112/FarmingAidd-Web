from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import nltk
import string
import random
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Read text file (knowledge base for TF-IDF)
with open('chatbot.txt', 'r', errors='ignore') as f:
    raw_doc = f.read()

raw_doc = raw_doc.lower()

# Download NLTK data (only once)
# nltk.download('punkt')
# nltk.download('wordnet')
# nltk.download('omw-1.4')  # important for lemmatizer

# Use PunktSentenceTokenizer directly to avoid punkt_tab error
from nltk.tokenize import PunktSentenceTokenizer

tokenizer = PunktSentenceTokenizer()
sent_tokens = tokenizer.tokenize(raw_doc)
word_tokens = nltk.word_tokenize(raw_doc)

lemmer = nltk.stem.WordNetLemmatizer()

# Cleaning & normalization functions
def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

# Greeting logic
GREET_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey")
GREET_RESPONSES = ["hi", "hey", "hello", "I am glad you are talking to me"]

def greet(sentence):
    for word in sentence.split():
        if word.lower() in GREET_INPUTS:
            return random.choice(GREET_RESPONSES)
    return None

# Load corpus.json
with open("corpus.json", "r", encoding="utf-8") as file:
    corpus = json.load(file)

# Corpus-based response
def corpus_response(user_input):
    response = corpus.get(user_input.strip())
    if response:
        return response
    return None

# TF-IDF response
def tfidf_response(user_response):
    robo_response = ''
    local_sent_tokens = sent_tokens.copy()
    local_sent_tokens.append(user_response)
    
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(local_sent_tokens)
    
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]

    if req_tfidf == 0:
        robo_response = "I am sorry! I don't understand you."
    else:
        robo_response = local_sent_tokens[idx]

    return robo_response


# Full response function (combining everything)
def get_bot_response(user_response):
    user_response = user_response.lower().strip()

    if user_response in ['bye', 'exit', 'quit']:
        return "Bye! Take care."

    if user_response in ['thanks', 'thank you']:
        return "You are welcome!"

    greeting = greet(user_response)
    if greeting:
        return greeting

    corpus_reply = corpus_response(user_response)
    if corpus_reply:
        return corpus_reply

    return tfidf_response(user_response)

# Flask setup
app = Flask(__name__)
CORS(app)  # Allow React frontend to call this

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message")
    bot_reply = get_bot_response(user_message)
    return jsonify({"reply": bot_reply})

if __name__ == '__main__':
    app.run(debug=True)
