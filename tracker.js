const activeWin = require('active-win');

async function getAppStatus() {
  const result = await activeWin();
  const title = result?.title || "";
  const app = result?.owner?.name || "";

  if (/X|Twitter|Reddit/i.test(title + app)) return "distracted";
  if (/Code|Terminal|Notion|Docs/i.test(title + app)) return "focused";
  return "neutral";
}

async function testDetection() {
  try {
    const result = await activeWin();
    const title = result?.title || "No title";
    const app = result?.owner?.name || "No app";
    const status = await getAppStatus();
    
    console.log(`📱 App: ${app}`);
    console.log(`📄 Title: ${title}`);
    console.log(`🎯 Status: ${status}`);
    console.log(`🔗 Full: ${app} - ${title}`);
  } catch (error) {
    console.error('❌ Error detecting app:', error.message);
  }
}

module.exports = { getAppStatus, testDetection }; 