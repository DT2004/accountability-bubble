import React, { useEffect, useState } from 'react';

export default function BubbleOverlay() {
  const [message, setMessage] = useState({ emoji: '🙂', text: 'Welcome!' });

  useEffect(() => {
    const interval = setInterval(async () => {
      const state = await window.electron.getStatus(); // from preload
      const newMsg = await window.electron.getMessage(state);
      setMessage(newMsg);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-5 right-5 bg-white/20 backdrop-blur-md rounded-2xl p-4 shadow-xl text-white flex items-center space-x-2">
      <div className="text-4xl">{message.emoji}</div>
      <div className="text-lg font-semibold">{message.text}</div>
    </div>
  );
}
