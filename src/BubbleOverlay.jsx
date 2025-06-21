import React from 'react';

const BubbleOverlay = ({ emoji, text, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'focused':
        return 'from-green-400 to-blue-500';
      case 'distracted':
        return 'from-red-400 to-pink-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'focused':
        return 'text-green-100';
      case 'distracted':
        return 'text-red-100';
      default:
        return 'text-gray-100';
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      <div className="absolute top-4 right-4 pointer-events-auto">
        <div className={`
          relative bg-gradient-to-r ${getStatusColor()} 
          backdrop-blur-md bg-opacity-90 
          rounded-full px-4 py-2 
          shadow-lg border border-white/20
          transition-all duration-500 ease-in-out
          hover:scale-105 hover:shadow-xl
          max-w-xs
        `}>
          {/* Floating emoji */}
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg">
              <span className="text-2xl animate-bounce">{emoji}</span>
            </div>
          </div>
          
          {/* Message text */}
          <div className="ml-6 pr-2">
            <p className={`text-sm font-medium ${getTextColor()} leading-tight`}>
              {text}
            </p>
          </div>
          
          {/* Subtle glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${getStatusColor()} rounded-full blur-xl opacity-30 -z-10`}></div>
        </div>
      </div>
    </div>
  );
};

export default BubbleOverlay;
