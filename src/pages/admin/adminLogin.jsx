import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/slices/adminSlice'
import '../../styles/pages/AdminLogin.css'
import DOMPurify from 'dompurify'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Hardcoded credentials for demo purposes
    const ADMIN_EMAIL = 'admin@example.com'
    const ADMIN_PASSWORD = 'admin123'

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      dispatch(
        login({
          email,
          role: 'admin'
        })
      )
      navigate('/admin/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className='admin-login-wrapper'>
      <div
        className={`admin-login-container ${isHovered ? 'card-hover' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='login-header'>
          <h2>Admin Portal</h2>
          <p>Secure Access Required</p>
        </div>

        {error && <div className='error-message'>{error}</div>}

        <form onSubmit={handleSubmit} className='login-form'>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <div className='input-wrapper'>
              <i className='icon-mail' />
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(DOMPurify.sanitize(e.target.value))}
                placeholder='Enter your email'
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <i className='icon-lock' />
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) =>
                  setPassword(DOMPurify.sanitize(e.target.value))}
                placeholder='Enter your password'
                required
              />
            </div>
          </div>

          <button type='submit' className='login-button'>
            Sign In
          </button>

          <div className='forgot-password'>
            <a href='#'>Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
