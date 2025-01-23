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

  const handleInputChange = (e, stateUpdater) => {
    const { name, value } = e.target;
    stateUpdater((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e, validator, state, action, successMessage) => {
    e.preventDefault();
    if (!validator()) {
      setMessage('Please fill out all fields correctly.');
      return;
    }
    action(state);
    setMessage(successMessage);
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
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email),
              profile,
              onUpdateProfile,
              'Profile updated successfully!'
            )
          }
          className="profile-form"
        >
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profile.username}
              onChange={(e) => handleInputChange(e, setProfile)}
              placeholder="Enter username"
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
              onChange={(e) => handleInputChange(e, setProfile)}
              placeholder="Enter email"
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
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              () => password.currentPassword && password.newPassword,
              password,
              onChangePassword,
              'Password changed successfully!'
            )
          }
          className="password-form"
        >
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={password.currentPassword}
              onChange={(e) => handleInputChange(e, setPassword)}
              placeholder="Enter current password"
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
              onChange={(e) => handleInputChange(e, setPassword)}
              placeholder="Enter new password"
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
            onClick={() => {
              const selection = window.getSelection();
              if (selection && selection.rangeCount > 0) {
                try {
                  selection.removeAllRanges();
                } catch (error) {
                  console.warn('Error clearing selection:', error);
                }
              }
              toggleDarkMode();
            }}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
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
