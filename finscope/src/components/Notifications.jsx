// src/components/Notifications.jsx
import React, { useEffect, useState } from 'react';
import '../styles/Notifications.css';
import { getNotifications, deleteNotification } from '../services/notifications';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const data = await getNotifications(token);
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  const handleDismiss = async (id) => {
    try {
      await deleteNotification(token, id);
      setNotifications(prev => prev.filter(notif => notif._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="notifications-container">
      <header className="notifications-header">
        <h2 className="notifications-title">Notifications</h2>
      </header>
      {notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map(notif => (
            <li key={notif._id} className={`notification-item ${notif.type || 'info'}`}>
              <div className="notification-content">
                <p className="notification-message">{notif.message}</p>
                <p className="notification-time">{new Date(notif.createdAt).toLocaleString()}</p>
              </div>
              <button className="dismiss-button" onClick={() => handleDismiss(notif._id)}>
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-notifications">
          <p>No notifications at this time.</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
