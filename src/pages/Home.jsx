import React from 'react'
import Hero from '../component/Hero'; 
import Solution from '../component/Solution';
import Footer from '../component/Footer';
import SignUP from '../component/SignUp';

const Home = () => {
  return (
    <div>
      <Hero/>
      <Solution/>
      <SignUP/>
      <Footer/>
    </div>
  )
}

export default Home
