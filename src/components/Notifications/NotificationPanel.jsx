import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationPanel = ({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDelete, 
  onDeleteAll,
  onClose 
}) => {
  return (
    <div className="absolute right-8 top-20 w-[580px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      {/* Purple Header - Matches Flowva exactly */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Notifications</h3>
          <div className="flex items-center gap-6">
            <button 
              onClick={onMarkAllAsRead}
              className="text-white text-sm hover:text-purple-100 transition-colors font-medium"
            >
              Mark all as read
            </button>
            <button 
              onClick={onDeleteAll}
              className="text-white text-sm hover:text-purple-100 transition-colors font-medium"
            >
              Delete All
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List - NO padding, items have their own */}
      <div className="max-h-[600px] overflow-y-auto">
        {notifications.length === 0 ? (
          // Empty state matching Flowva design
          <div className="text-center py-20 px-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔔</span>
            </div>
            <p className="text-gray-800 font-semibold text-base mb-2">No notifications yet</p>
            <p className="text-gray-500 text-sm">We'll notify you when something important happens</p>
          </div>
        ) : (
          <div>
            {notifications.map(notif => (
              <NotificationItem
                key={notif.id}
                notification={notif}
                onMarkAsRead={onMarkAsRead}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;