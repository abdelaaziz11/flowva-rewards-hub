import { useState, useEffect } from 'react';
import { notificationsService } from '../services/notifications.service';

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      loadNotifications();
    } else {
      setNotifications([]);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationsService.getUserNotifications(userId);
      setNotifications(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error loading notifications:', err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    if (!userId) return;
    
    try {
      await notificationsService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const markAllAsRead = async () => {
    if (!userId) return;
    
    try {
      await notificationsService.markAllAsRead(userId);
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteNotification = async (notificationId) => {
    if (!userId) return;
    
    try {
      await notificationsService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteAll = async () => {
    if (!userId) return;
    
    try {
      await notificationsService.deleteAllNotifications(userId);
      setNotifications([]);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAll,
    refreshNotifications: loadNotifications,
  };
};