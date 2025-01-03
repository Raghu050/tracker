import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './NotificationsBar.css';


const NotificationsBar = () => {
  const [notifications, setNotifications] = useState({ overdue: [], upcoming: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/notifications');
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div className="notifications-bar">Loading notifications...</div>;
  if (error) return <div className="notifications-bar error">{error}</div>;

  return (
    <div className="notifications-bar">
      <h4>Notifications</h4>
      <div className="overdue">
        <h5>Overdue Communications</h5>
        {notifications.overdue.length === 0 ? (
          <p>No overdue communications</p>
        ) : (
          <ul>
            {notifications.overdue.map((log) => (
              <li key={log._id}>
                {log.companyId.name} - {log.communicationType} (Due: {new Date(log.communicationDate).toLocaleDateString()})
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="upcoming">
        <h5>Upcoming Communications</h5>
        {notifications.upcoming.length === 0 ? (
          <p>No upcoming communications</p>
        ) : (
          <ul>
            {notifications.upcoming.map((log) => (
              <li key={log._id}>
                {log.companyId.name} - {log.communicationType} (Due: {new Date(log.communicationDate).toLocaleDateString()})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsBar;
