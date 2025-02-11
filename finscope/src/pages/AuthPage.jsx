// src/pages/AuthPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/AuthPage.css';

const baseUrl = import.meta.env.VITE_API_URL;

const AuthPage = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInData),
      });
      const data = await response.json();
      if (!response.ok) {
        alert('Login failed: ' + (data.message || 'Unknown error'));
        return;
      }
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpData),
      });
      const data = await response.json();
      if (!response.ok) {
        alert('Registration failed: ' + (data.message || 'Unknown error'));
        return;
      }
      alert('Registration successful! Please log in.');
      setIsSignUpActive(false);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration error');
    }
  };

  const SocialIcons = () => (
    <div className="auth-social-container">
      <a href="#!" className="auth-social">
        <svg width="24" height="24" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.27 3.2l6.92-6.92C36.2 3.32 30.48 1 24 1 14.93 1 6.8 5.14 2.64 11.24l7.89 6.13C12.38 11.03 17.64 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.64 24.5c0-1.64-.15-3.22-.45-4.75H24v9h12.76c-.55 3.04-2.16 5.6-4.63 7.32l7.1 5.48C44.05 37.07 46.64 31.2 46.64 24.5z" />
          <path fill="#FBBC05" d="M10.53 28.9l-7.89-6.13C2.7 23.67 2 26.19 2 28.9s.7 5.23 2.64 6.93l7.89-6.13z" />
          <path fill="#34A853" d="M24 46c6.48 0 12-2.14 16-5.81l-7.1-5.48C30.72 38.77 27.54 40 24 40c-6.36 0-11.62-2.53-15.35-6.66l-7.89 6.13C6.8 42.86 14.93 46 24 46z" />
        </svg>
      </a>
      <a href="#!" className="auth-social">
        <svg width="24" height="24" viewBox="0 0 320 512">
          <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S259.2 0 225.36 0c-73.22 0-121.14 44.38-121.14 124.72v70.62H22.89V288h81.33v224h100.2V288z" />
        </svg>
      </a>
      <a href="#!" className="auth-social">
        <svg width="24" height="24" viewBox="0 0 448 512">
          <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.72 0 53.36 0 24.09 24.09 0 53.79 0 83.52 0 107.7 24.09 107.7 53.36c0 30.36-24.09 54.74-53.91 54.74zM447.9 448h-92.68V302.4c0-34.7-12.43-58.4-43.44-58.4-23.7 0-37.8 16-44 31.4-2.3 5.6-2.9 13.4-2.9 21.3V448h-92.68V148.9h92.68v37.7c12.3-19 34.3-46.1 83.4-46.1 60.9 0 106.6 39.8 106.6 125.3V448z" />
        </svg>
      </a>
    </div>
  );

  if (isMobile) {
    return (
      <div className="auth-page auth-mobile-only">
        <h1 className="auth-title">FinScope</h1>
        {!isSignUpActive ? (
          <form onSubmit={handleSignInSubmit} className="auth-mobile-form">
            <h2>Sign In</h2>
            <input type="email" name="email" placeholder="Email" value={signInData.email} onChange={handleSignInChange} required />
            <input type="password" name="password" placeholder="Password" value={signInData.password} onChange={handleSignInChange} required />
            <SocialIcons />
            <button type="submit" className="auth-button">Sign In</button>
            <p><Link to="/password-recovery">Forgot Password?</Link></p>
            <div className="auth-switch-buttons">
              <button type="button" className="auth-button auth-ghost" onClick={() => setIsSignUpActive(true)}>Go to Sign Up</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit} className="auth-mobile-form">
            <h2>Sign Up</h2>
            <input type="text" name="name" placeholder="Name" value={signUpData.name} onChange={handleSignUpChange} required />
            <input type="email" name="email" placeholder="Email" value={signUpData.email} onChange={handleSignUpChange} required />
            <input type="password" name="password" placeholder="Password" value={signUpData.password} onChange={handleSignUpChange} required />
            <SocialIcons />
            <button type="submit" className="auth-button">Sign Up</button>
            <div className="auth-switch-buttons">
              <button type="button" className="auth-button auth-ghost" onClick={() => setIsSignUpActive(false)}>Go to Sign In</button>
            </div>
          </form>
        )}
      </div>
    );
  }
  return (
    <div className="auth-page">
      <h1 className="auth-title">FinScope</h1>
      <div className={`auth-container ${isSignUpActive ? 'auth-right-panel-active' : ''}`}>
        <div className="auth-form-wrapper auth-sign-in-container">
          <form onSubmit={handleSignInSubmit}>
            <h1>Sign In</h1>
            <input type="email" name="email" placeholder="Email" value={signInData.email} onChange={handleSignInChange} required />
            <input type="password" name="password" placeholder="Password" value={signInData.password} onChange={handleSignInChange} required />
            <SocialIcons />
            <button type="submit" className="auth-button">Sign In</button>
            <p><Link to="/password-recovery">Forgot Password?</Link></p>
          </form>
        </div>
        <div className="auth-form-wrapper auth-sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Sign Up</h1>
            <input type="text" name="name" placeholder="Name" value={signUpData.name} onChange={handleSignUpChange} required />
            <input type="email" name="email" placeholder="Email" value={signUpData.email} onChange={handleSignUpChange} required />
            <input type="password" name="password" placeholder="Password" value={signUpData.password} onChange={handleSignUpChange} required />
            <SocialIcons />
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
        </div>
        <div className="auth-overlay-container">
          <div className="auth-overlay">
            <div className="auth-overlay-panel auth-overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected, please login with your personal info</p>
              <button type="button" className="auth-button auth-ghost" onClick={() => setIsSignUpActive(false)}>Sign In</button>
            </div>
            <div className="auth-overlay-panel auth-overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button type="button" className="auth-button auth-ghost" onClick={() => setIsSignUpActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
