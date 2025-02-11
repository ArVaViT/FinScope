import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Settings.css';

const Settings = ({ onUpdateProfile, onChangePassword, isDarkMode, toggleDarkMode }) => {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [password, setPassword] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const isExpanded = profileOpen || passwordOpen;
  const containerClass = `settings-container ${isExpanded ? 'expanded' : 'collapsed'}`;

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e, validator, data, action, successMsg) => {
    e.preventDefault();
    if (!validator()) {
      setMessage('Please fill out all fields correctly.');
      return;
    }
    action(data);
    setMessage(successMsg);
  };

  return (
    <div className={containerClass}>
      <h2 className="settings-title">Settings</h2>
      {message && <p className="settings-message">{message}</p>}
      <div className="settings-cards">
        <section className="settings-card">
          <div className="settings-card-header">
            <h3 className="settings-card-title">Update Profile</h3>
            <button
              className="toggle-button"
              onClick={() => setProfileOpen(prev => !prev)}
              aria-expanded={profileOpen}
            >
              {profileOpen ? 'Hide' : 'Show'}
            </button>
          </div>
          {profileOpen && (
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
              className="settings-form"
            >
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profile.username}
                  onChange={(e) => handleInputChange(e, setProfile)}
                  placeholder="Enter username"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange(e, setProfile)}
                  placeholder="Enter email"
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="form-button">Update Profile</button>
            </form>
          )}
        </section>
        <section className="settings-card">
          <div className="settings-card-header">
            <h3 className="settings-card-title">Change Password</h3>
            <button
              className="toggle-button"
              onClick={() => setPasswordOpen(prev => !prev)}
              aria-expanded={passwordOpen}
            >
              {passwordOpen ? 'Hide' : 'Show'}
            </button>
          </div>
          {passwordOpen && (
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
              className="settings-form"
            >
              <div className="form-group">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={(e) => handleInputChange(e, setPassword)}
                  placeholder="Enter current password"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={(e) => handleInputChange(e, setPassword)}
                  placeholder="Enter new password"
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="form-button">Change Password</button>
            </form>
          )}
        </section>
        <section className="settings-card">
          <h3 className="settings-card-title">Theme Settings</h3>
          <div className="settings-form">
            <button
              onClick={toggleDarkMode}
              className="form-button theme-toggle-btn"
              aria-label="Toggle theme"
            >
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </section>
        <section className="settings-card">
          <h3 className="settings-card-title">Support</h3>
          <p className="settings-card-description">
            Need assistance? Contact our support team.
          </p>
          <button className="form-button contact-support-btn">Contact Support</button>
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
