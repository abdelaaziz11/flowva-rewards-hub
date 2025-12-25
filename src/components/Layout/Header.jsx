import React from 'react';
import { Bell } from 'lucide-react';

const Header = ({ title, subtitle, onNotificationClick, hasUnread, unreadCount = 0 }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
        )}
      </div>
      
      {/* Notification Bell with Badge */}
      <button 
        onClick={onNotificationClick}
        className="relative p-3 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell size={22} className="text-gray-700" />
        {hasUnread && unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
