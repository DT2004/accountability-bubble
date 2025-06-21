# 🔧 Accountability App Debug Guide

## Step 1: Check if React Dev Server is Running

```bash
# In your project directory, run:
npm run react-start

# This should show:
# Project is running at http://localhost:8080/
```

**If this fails**, you're missing webpack config or React files.

## Step 2: Start the Full App Properly

```bash
# This runs both React dev server AND Electron:
npm start

# It should:
# 1. Start webpack dev server on port 8080
# 2. Wait for server to be ready
# 3. Launch Electron app
```

## Step 3: Missing React Files Fix

Create these files if they don't exist:

### `src/App.jsx`
```jsx
import React, { useState, useEffect } from 'react';
import BubbleOverlay from './BubbleOverlay';

function App() {
  const [appStatus, setAppStatus] = useState('neutral');
  const [message, setMessage] = useState({ emoji: '💻', text: 'Ready to focus!' });

  useEffect(() => {
    const checkStatus = async () => {
      if (window.electron) {
        try {
          const status = await window.electron.getStatus();
          setAppStatus(status);
          const newMessage = window.electron.getMessage(status);
          setMessage(newMessage);
        } catch (error) {
          console.error('Error getting app status:', error);
        }
      }
    };

    // Check status every 3 seconds
    const interval = setInterval(checkStatus, 3000);
    checkStatus(); // Initial check

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <BubbleOverlay status={appStatus} message={message} />
    </div>
  );
}

export default App;
```

### `src/BubbleOverlay.jsx`
```jsx
import React from 'react';

const BubbleOverlay = ({ status, message }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'focused': return 'bg-green-500';
      case 'distracted': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className={`
      fixed top-0 left-0 w-full h-full flex items-start justify-end p-4
      pointer-events-none
    `}>
      <div className={`
        ${getStatusColor(status)}
        rounded-full p-4 shadow-lg backdrop-blur-sm bg-opacity-90
        text-white font-semibold text-sm
        animate-pulse
        pointer-events-auto cursor-pointer
        transition-all duration-300 ease-in-out
        hover:scale-105
      `}>
        <div className="flex items-center space-x-2">
          <span className="text-lg">{message.emoji}</span>
          <span>{message.text}</span>
        </div>
      </div>
    </div>
  );
};

export default BubbleOverlay;
```

### `src/index.js`
```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
```

### `src/styles.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: transparent;
}

.app {
  width: 100vw;
  height: 100vh;
  background: transparent;
}
```

## Step 4: Add Missing Message Files

### `messageEngine.js`
```javascript
const messages = require('./messages.json');

function getMessageForState(state) {
  const stateMessages = messages[state] || messages.neutral;
  const randomMessage = stateMessages.messages[
    Math.floor(Math.random() * stateMessages.messages.length)
  ];
  return randomMessage;
}

module.exports = { getMessageForState };
```

### `messages.json`
```json
{
  "focused": {
    "messages": [
      { "emoji": "🚀", "text": "You're on fire! Keep going!" },
      { "emoji": "💪", "text": "Crushing it! Stay focused!" },
      { "emoji": "⚡", "text": "In the zone! Don't stop!" }
    ]
  },
  "distracted": {
    "messages": [
      { "emoji": "😤", "text": "Bro, stop DMing on X" },
      { "emoji": "🎯", "text": "Time to get back to work!" },
      { "emoji": "⏰", "text": "Focus mode activated!" }
    ]
  },
  "neutral": {
    "messages": [
      { "emoji": "💻", "text": "Ready when you are!" },
      { "emoji": "🤖", "text": "Your accountability buddy" },
      { "emoji": "✨", "text": "Let's be productive!" }
    ]
  }
}
```

## Step 5: Debug Steps

1. **Check if port 8080 is free:**
   ```bash
   lsof -ti:8080
   # If something is running, kill it:
   kill $(lsof -ti:8080)
   ```

2. **Run commands separately for debugging:**
   ```bash
   # Terminal 1:
   npm run react-start
   
   # Terminal 2 (after React starts):
   npm run electron-start
   ```

3. **Enable DevTools in main.js:**
   ```javascript
   // Uncomment this line in main.js:
   mainWindow.webContents.openDevTools({ mode: 'detach' });
   ```

## Step 6: macOS Permissions

Make sure you've granted Accessibility permissions:
1. System Settings → Privacy & Security → Accessibility
2. Add Terminal or your code editor
3. Enable the permission

## Step 7: Test App Detection

Use the debug script to test if app detection is working:

```bash
# Test the tracker functionality:
node debug-tracker.js

# This will run 10 tests with 2-second intervals
# showing which apps are detected and their status
```

## Step 8: Alternative Simple Mode

If the webpack version isn't working, try the simplified standalone version:

```bash
# Run the simplified version (no webpack needed):
npm run simple

# This uses standalone.html with CDN React and Tailwind
```

## Common Error Solutions

**"Cannot read property 'getStatus' of undefined"**
- The preload script isn't loading properly
- Check that preload.js path is correct in main.js

**"EADDRINUSE port 8080"**
- Another process is using port 8080
- Kill it: `kill $(lsof -ti:8080)`

**Electron window shows white screen**
- React dev server isn't running
- Check browser console for errors

**"active-win" module errors**
- Need macOS accessibility permissions
- Or the module isn't installed: `npm install active-win`

**"Cannot find module 'tailwindcss'"**
- Tailwind CSS isn't installed properly
- Run: `npm install tailwindcss@^3.4.0`

**Webpack compilation errors**
- Check that all React files exist in src/
- Verify webpack.config.js is correct
- Try: `npm run clean` to reinstall dependencies

## Quick Fix Commands

```bash
# Kill all processes on port 8080
kill $(lsof -ti:8080)

# Clean install dependencies
npm run clean

# Test app detection
node debug-tracker.js

# Run simple version
npm run simple

# Run full version
npm start
```

## File Structure Check

Make sure you have these files:
```
accountability-bubble/
├── src/
│   ├── App.jsx ✅
│   ├── BubbleOverlay.jsx ✅
│   ├── index.js ✅
│   └── styles.css ✅
├── main.js ✅
├── preload.js ✅
├── tracker.js ✅
├── messageEngine.js ✅
├── messages.json ✅
├── webpack.config.js ✅
├── package.json ✅
└── DEBUG.md ✅
```

## Still Having Issues?

1. Check the browser console (F12) for JavaScript errors
2. Check the Electron console for Node.js errors
3. Verify all file paths are correct
4. Make sure you're in the right directory
5. Try the simple version first: `npm run simple` 