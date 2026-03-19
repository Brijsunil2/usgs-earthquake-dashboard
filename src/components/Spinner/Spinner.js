import React from 'react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };

  return React.createElement(
    'div',
    {
      className: `inline-block animate-spin rounded-full border-t-transparent border-accent ${sizeClasses[size] || sizeClasses.md} ${className}`,
      role: 'status',
    },
    React.createElement('span', { className: 'sr-only' }, 'Loading...')
  );
};

export default Spinner;
