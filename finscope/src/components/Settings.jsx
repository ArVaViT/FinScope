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
      <h2 className="settings-title">Settings</h2>
      {message && <p className="status-message">{message}</p>}

      <div className="settings-grid">
        <section className="settings-block">
          <h3 className="settings-section-title">Update Profile</h3>
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
            <div className="settings-group">
              <label htmlFor="username" className="settings-label">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={profile.username}
                onChange={(e) => handleInputChange(e, setProfile)}
                placeholder="Enter username"
                className="settings-input"
                required
              />
            </div>
            <div className="settings-group">
              <label htmlFor="email" className="settings-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={(e) => handleInputChange(e, setProfile)}
                placeholder="Enter email"
                className="settings-input"
                required
              />
            </div>
            <button type="submit" className="settings-button">
              Update Profile
            </button>
          </form>
        </section>

        <section className="settings-block">
          <h3 className="settings-section-title">Change Password</h3>
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
            <div className="settings-group">
              <label htmlFor="currentPassword" className="settings-label">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={password.currentPassword}
                onChange={(e) => handleInputChange(e, setPassword)}
                placeholder="Enter current password"
                className="settings-input"
                required
              />
            </div>
            <div className="settings-group">
              <label htmlFor="newPassword" className="settings-label">New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={password.newPassword}
                onChange={(e) => handleInputChange(e, setPassword)}
                placeholder="Enter new password"
                className="settings-input"
                required
              />
            </div>
            <button type="submit" className="settings-button">
              Change Password
            </button>
          </form>
        </section>

        <section className="settings-block">
          <h3 className="settings-section-title">Theme Settings</h3>
          <div className="settings-group">
            <label htmlFor="theme" className="settings-label">Choose Theme:</label>
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
              className="theme-toggle-btn settings-button"
              aria-label="Toggle theme"
            >
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </section>

        <section className="settings-block">
          <h3 className="settings-section-title">Support</h3>
          <p className="settings-description">
            Need help? Reach out to our support team for assistance with your account.
          </p>
          <button className="settings-button">Contact Support</button>
        </section>
      </div>
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
