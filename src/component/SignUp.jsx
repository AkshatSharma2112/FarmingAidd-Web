import React from 'react'
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="sign-up-section">
      <h1>Get Registered</h1>
      <form>
        <label>
            First Name
            <input type="text" name="firstName" required/>
        </label>
        <label>
            Last Name
            <input type="text" name="lastName" required/>
        </label>
        <label>
            username
            <input type="text" />
        </label>
        <label>
            Mob. No.
            <input type="tel" name="mobile" required/>
        </label>
        <lable className ='email'>Email
            <input type="email" name="email" required/>
        </lable>
        <lable>Password
            <input type="password" name="password" required/>
            </lable>
            <button>Register</button>
      </form>
    </div>
  )
}

export default SignUp
