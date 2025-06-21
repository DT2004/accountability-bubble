const fs = require('fs');
const path = require('path');

const messages = JSON.parse(fs.readFileSync(path.join(__dirname, 'messages.json')));

function getMessageForState(state) {
  const pool = messages[state] || [];
  if (pool.length === 0) {
    return { emoji: "🙂", text: "Keep going!" };
  }
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

module.exports = { getMessageForState }; 