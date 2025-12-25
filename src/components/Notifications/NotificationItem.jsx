import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { formatTimeAgo } from '../../utils/helpers';

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getNotificationIcon = (message) => {
    // Detect notification type from message
    if (message.includes('streak')) return '🔥';
    if (message.includes('Welcome')) return '😊';
    if (message.includes('Automate') || message.includes('Schedule')) return '📱';
    return '🎉';
  };

  const getIconBgColor = (message) => {
    if (message.includes('streak')) return 'bg-orange-100';
    if (message.includes('Welcome')) return 'bg-green-100';
    if (message.includes('Automate')) return 'bg-purple-100';
    return 'bg-purple-100';
  };

  return (
    <div 
      className={`px-6 py-4 transition-all cursor-pointer ${
        notification.read ? 'bg-white hover:bg-gray-50' : 'bg-purple-50 hover:bg-purple-100'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-12 h-12 ${getIconBgColor(notification.message)} rounded-full flex items-center justify-center flex-shrink-0`}>
          <span className="text-2xl">{getNotificationIcon(notification.message)}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 text-base mb-1">
                {notification.title || 'Notification'}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {formatTimeAgo(notification.created_at)}
              </p>
            </div>

            {/* Three dots menu */}
            <button 
              className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0 mt-1"
              onClick={(e) => {
                e.stopPropagation();
                // Show menu options
              }}
            >
              <MoreHorizontal size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;

