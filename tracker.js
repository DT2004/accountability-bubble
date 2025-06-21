const activeWin = require('active-win');

async function getAppStatus() {
  const result = await activeWin();
  const title = result?.title || "";
  const app = result?.owner?.name || "";

  if (/X|Twitter|Reddit/i.test(title + app)) return "distracted";
  if (/Code|Terminal|Notion|Docs/i.test(title + app)) return "focused";
  return "neutral";
}

module.exports = { getAppStatus }; 