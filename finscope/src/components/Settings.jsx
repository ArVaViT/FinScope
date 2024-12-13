import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Settings.css';
import '../styles/global.css';

const Settings = ({ onUpdateProfile, onChangePassword, isDarkMode, toggleDarkMode }) => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleProfileChange = ({ target: { name, value } }) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePasswordChange = ({ target: { name, value } }) => {
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(profile.email)) {
      setMessage('Invalid email address.');
      return;
    }
    onUpdateProfile(profile);
    setMessage('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password.currentPassword || !password.newPassword) {
      setMessage('Both password fields are required.');
      return;
    }
    onChangePassword(password);
    setMessage('Password changed successfully!');
  };

  return (
    <div
      className={`settings-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      aria-live="polite"
    >
      <h2>Settings</h2>
      {message && <p className="status-message">{message}</p>}

      <section className="profile-section">
        <h3>Update Profile</h3>
        <form onSubmit={handleProfileSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Update Profile
          </button>
        </form>
      </section>

      <section className="password-section">
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={password.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Change Password
          </button>
        </form>
      </section>

      <section className="theme-section">
        <h3>Theme Settings</h3>
        <div className="form-group">
          <label htmlFor="theme">Choose Theme:</label>
          <button
            onClick={toggleDarkMode}
            className="theme-toggle-btn"
          >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </section>
    </div>
  );
};

Settings.propTypes = {
  onUpdateProfile: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Settings;
