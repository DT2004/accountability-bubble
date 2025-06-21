import React from 'react';

export default function BubbleOverlay({ emoji, text, status }) {
  // Get status-specific styling
  const getStatusStyles = () => {
    switch (status) {
      case 'focused':
        return 'bg-green-500/20 border-green-400/30';
      case 'distracted':
        return 'bg-red-500/20 border-red-400/30';
      default:
        return 'bg-white/20 border-white/30';
    }
  };

  return (
    <div className={`fixed top-5 right-5 ${getStatusStyles()} backdrop-blur-md rounded-2xl p-4 shadow-xl text-white flex items-center space-x-2 border transition-all duration-300`}>
      <div className="text-4xl">{emoji}</div>
      <div className="text-lg font-semibold">{text}</div>
    </div>
  );
}
