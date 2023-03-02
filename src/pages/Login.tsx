import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, googleProvider } from '../config/firebase'

const Login = () => {
  const navigate = useNavigate()

  const [signUp, setSignUp] = useState({ email: '', password: '' })
  const [signIn, setSignIn] = useState({ email2: '', password2: '' })

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log(result)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const signUpCredentials = (e: React.ChangeEvent) => {
    setSignUp({
      ...signUp,
      [(e.target as HTMLInputElement).id]: (e.target as HTMLInputElement).value
    })
  }
  const signInCredentials = (e: React.ChangeEvent) => {
    setSignIn({
      ...signIn,
      [(e.target as HTMLInputElement).id]: (e.target as HTMLInputElement).value
    })
  }

  const signUpWithEmail = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        signUp.email,
        signUp.password
      )
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }
  const signInWithEmail = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        signIn.email2,
        signIn.password2
      )
      console.log(user.user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={signInWithGoogle}>Sign in with google</button>
      <div>
        <h3>Sign Up</h3>
        <div>
          <label htmlFor='email'>Email </label>
          <input
            type='text'
            id='email'
            value={signUp.email}
            onChange={signUpCredentials}
          />
        </div>
        <div>
          <label htmlFor='password'>Password </label>
          <input
            type='password'
            id='password'
            value={signUp.password}
            onChange={signUpCredentials}
          />
        </div>
        <button onClick={signUpWithEmail}>Sign Up</button>
      </div>
      <div>
        <h3>Sign In</h3>
        <div>
          <label htmlFor='email'>Email </label>
          <input
            type='text'
            id='email2'
            value={signIn.email2}
            onChange={signInCredentials}
          />
        </div>
        <div>
          <label htmlFor='password'>Password </label>
          <input
            type='password'
            id='password2'
            value={signIn.password2}
            onChange={signInCredentials}
          />
        </div>
        <button onClick={signInWithEmail}>Sign In</button>
      </div>
    </div>
  )
}

export default Login
