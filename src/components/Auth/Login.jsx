import React, { useState } from 'react';
import './Login.css'; // Import your CSS file

const AnimatedLogin = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      {/* Background Animation - Subtle Particles/Glow */}
      <div className="background-animation">
        <div className="blob blob-purple animation-delay-2000"></div>
        <div className="blob blob-blue animation-delay-4000"></div>
        <div className="blob blob-pink"></div>
      </div>

      {/* Login Card */}
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <form onSubmit={submitHandler} className="login-form">
          {/* Email Input */}
          <div className="input-group input-group-delay-100">
            <label htmlFor="email" className="input-label">Email Address</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div className="input-group input-group-delay-200">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-button login-button-delay-300"
          >
            Log In
          </button>
        </form>

        <p className="signup-link-text signup-link-delay-400">
          Don't have an account?{' '}
          <a href="#" className="signup-link">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default AnimatedLogin;