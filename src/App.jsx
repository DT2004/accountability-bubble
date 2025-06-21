import React, { useState, useEffect } from 'react';
import BubbleOverlay from './BubbleOverlay';
import './styles.css';

function App() {
  const [appStatus, setAppStatus] = useState('neutral');
  const [message, setMessage] = useState({ emoji: '🙂', text: 'Starting up...' });

  useEffect(() => {
    // Check app status every 3 seconds
    const checkStatus = async () => {
      try {
        if (window.electron && window.electron.getStatus) {
          const status = await window.electron.getStatus();
          if (status !== appStatus) {
            setAppStatus(status);
            const newMessage = window.electron.getMessage(status);
            setMessage(newMessage);
          }
        }
      } catch (error) {
        console.error('Error checking app status:', error);
      }
    };

    // Initial check
    checkStatus();

    // Set up interval
    const interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, [appStatus]);

  return (
    <div className="app">
      <BubbleOverlay 
        emoji={message.emoji} 
        text={message.text} 
        status={appStatus}
      />
    </div>
  );
}

export default App;
