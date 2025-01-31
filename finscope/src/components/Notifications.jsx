import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Notifications.css';
import '../styles/global.css';

const Notifications = ({ notifications }) => {
  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="notification-list">
          {notifications.map((notification, index) => (
            <li
              key={index}
              className={`notification-item ${notification.type || 'info'}`}
              role="alert"
              aria-label={`${notification.type || 'info'} notification`}
            >
              <p className="notification-title">
                {notification.title || 'Untitled'}
              </p>
              <p className="notification-message">
                {notification.message || 'No message available.'}
              </p>
              <p className="notification-time">
                {notification.time || 'Unknown time'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-notifications-container">
          <p className="no-notifications" role="status">
            You have no notifications at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      message: PropTypes.string,
      time: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
};

export default Notifications;
