const activeWin = require('active-win');

async function getAppStatus() {
  try {
    const result = await activeWin();
    if (!result) {
      return "neutral";
    }
    
    const title = (result.title || "").toLowerCase();
    const app = (result.owner?.name || "").toLowerCase();
    const combined = `${title} ${app}`;

    // Distraction sites/apps
    if (/twitter|x\.com|instagram|reddit|youtube|tiktok|facebook|snapchat/.test(combined)) {
      return "distracted";
    }

    // Focused work apps
    if (/code|terminal|notion|docs|obsidian|figma|xcode|intellij|sublime|vim|leetcode|hackerrank|github/.test(combined)) {
      return "focused";
    }

    // Neutral (could be work or not)
    if (/gmail|inbox|slack|teams|zoom|calendar|search|safari|chrome|firefox|arc/.test(combined)) {
      return "neutral";
    }

    return "neutral";
  } catch (error) {
    console.error('Error detecting active window:', error);
    return "neutral";
  }
}

module.exports = { getAppStatus };