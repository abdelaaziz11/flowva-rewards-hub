import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  icon: Icon,
  fullWidth = false,
  className = ''
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-colors flex items-center justify-center gap-2';
  
  const variantStyles = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-300',
    secondary: 'bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-200',
    outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
