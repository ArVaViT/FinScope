import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/PasswordForm.css';

const PasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }
    await onSubmit(email);
  };

  return (
    <div className="password-form-container">
      <h2 className="password-form-title">Password Recovery</h2>
      {message && <p className="password-form-message">{message}</p>}
      <form onSubmit={handleSubmit} className="password-form">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="password-form-input"
          required
        />
        <button type="submit" className="password-form-button">Send Reset Link</button>
      </form>
    </div>
  );
};

PasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordForm;
