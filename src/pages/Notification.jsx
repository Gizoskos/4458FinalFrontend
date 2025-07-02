import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('https://four458apigateway.onrender.com/api/v1/alerts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      setNotifications(res.data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  return (
    <div className="container">
      <h2>My Job Alerts</h2>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul>
          {notifications.map((notif, index) => (
            <li key={index}>
              <strong>{notif?.title || 'Untitled'}</strong> – {notif?.city || 'Unknown'} ({notif?.country || 'N/A'})<br />
              <span>{notif?.description || 'No description available.'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
