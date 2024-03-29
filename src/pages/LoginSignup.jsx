import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'

import { LoginForm } from '../cmps/LoginForm.jsx'

export function LoginSignup() {
  const [isSignup, setIsSignUp] = useState(false)
  const navigate = useNavigate()

  function onLogin(credentials) {
    isSignup ? _signup(credentials) : _login(credentials)
  }

  async function _login(credentials) {
    try {
      await login(credentials)
      showSuccessMsg('Logged in successfully')
    } catch (err) {
      showErrorMsg('Oops try again')
    } finally {
      navigate('/toy')
    }
  }

  async function _signup(credentials) {
    try {
      await signup(credentials)
      showSuccessMsg('Signed in successfully')
    } catch (err) {
      showErrorMsg('Oops try again')
    } finally {
      navigate('/toy')
    }
  }

  return (
    <section className="login-signup">
      <h1>Welcome!</h1>
      <LoginForm onLogin={onLogin} isSignup={isSignup} />

      <div className="flex justify-center">
        <button onClick={() => setIsSignUp(!isSignup)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
        </button>
      </div>
    </section>
  )
}
