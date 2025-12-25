import React from 'react';
import { Home, Compass, BookOpen, Layers, CreditCard, Award, Settings } from 'lucide-react';
import NavItem from './NavItem';

const Sidebar = ({ activePage, onPageChange, user }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'library', icon: BookOpen, label: 'Library' },
    { id: 'stack', icon: Layers, label: 'Tech Stack' },
    { id: 'subs', icon: CreditCard, label: 'Subscriptions' },
    { id: 'rewards', icon: Award, label: 'Rewards Hub', highlighted: true },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">👓</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Flowva</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activePage === item.id}
              onClick={() => onPageChange(item.id)}
              highlighted={item.highlighted}
            />
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="mt-auto p-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
            <span className="text-purple-700 font-semibold">
              {user?.email?.[0]?.toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900">
              {user?.user_metadata?.name || 'User'}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {user?.email || 'user@example.com'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;