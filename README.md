# Accountability Bubble 🫧

A floating desktop agent that keeps you focused and accountable by monitoring your active applications and providing motivational messages.

## Features

- **Real-time Activity Monitoring**: Tracks which applications you're currently using
- **Smart Categorization**: Automatically categorizes apps as focused, distracted, or neutral
- **Motivational Messages**: Provides context-aware accountability messages with emojis
- **Always-on-Top**: Floating bubble that stays visible while you work
- **Transparent UI**: Modern, non-intrusive design with backdrop blur effects

## Screenshots

*Coming soon*

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- macOS (for active window monitoring)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/accountability-bubble.git
cd accountability-bubble
```

2. Install dependencies:
```bash
npm install
```

3. **Important**: Grant accessibility permissions (required for macOS):
   - Go to **System Settings** → **Privacy & Security** → **Accessibility**
   - Click the **+** button to add an application
   - Navigate to your project directory and select the Electron app
   - Enable the permission for the app

## Usage

### Development Mode

Start the application in development mode:
```bash
npm start
```

This will:
- Start the React development server on `http://localhost:8080`
- Launch the Electron app once the server is ready
- Enable hot reloading for development

### Production Build

Build the application for production:
```bash
npm run build
```

This creates a distributable package in the `dist` folder.

## How It Works

### App Categorization

The app monitors your active window and categorizes applications:

- **Focused**: Code editors, terminals, documentation tools
- **Distracted**: Social media, entertainment sites
- **Neutral**: Email, search engines, professional networking

### Message System

Based on your current activity, the bubble displays motivational messages:

- **Focused**: Encouraging messages to maintain momentum
- **Distracted**: Gentle reminders to get back to work
- **Neutral**: Balanced messages for productivity

## Project Structure

```
accountability-bubble/
├── src/                    # React source code
│   ├── App.jsx            # Main React component
│   ├── BubbleOverlay.jsx  # Floating bubble component
│   ├── index.js           # React entry point
│   └── styles.css         # Tailwind CSS styles
├── main.js                # Electron main process
├── preload.js             # Electron preload script
├── tracker.js             # Active window monitoring
├── messageEngine.js       # Message generation logic
├── messages.json          # Message database
├── webpack.config.js      # Webpack configuration
└── package.json           # Dependencies and scripts
```

## Customization

### Adding New Messages

Edit `messages.json` to add custom messages for each category:

```json
{
  "focused": {
    "messages": [
      { "emoji": "🚀", "text": "Your custom message here" }
    ]
  }
}
```

### Modifying App Categories

Update the categorization logic in `tracker.js`:

```javascript
if (/YourApp|YourKeyword/i.test(title + app)) return "focused";
```

## Technologies Used

- **Electron**: Desktop application framework
- **React**: UI library
- **Tailwind CSS**: Styling framework
- **active-win**: Active window monitoring
- **Webpack**: Build tool and development server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with ❤️ for productivity and focus
- Inspired by the need for gentle accountability in the digital age 