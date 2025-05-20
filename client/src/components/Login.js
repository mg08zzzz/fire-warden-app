import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.png';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email === 'test@uni.com' &&
      password === 'pass'
    ) {
      onLogin(email); // Allow access
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="University Logo" className="logo" />
        <h2>Fire Warden Tracker</h2>
        <p>Login with your university email and password.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="University Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
      </div>
    </div>
  );
}