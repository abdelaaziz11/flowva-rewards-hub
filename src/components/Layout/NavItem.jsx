import React from 'react';

const NavItem = ({ icon: Icon, label, active, onClick, highlighted = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left
        ${active 
          ? highlighted 
            ? 'bg-purple-100 text-purple-700' 
            : 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50'
        }
      `}
    >
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
};

export default NavItem;
