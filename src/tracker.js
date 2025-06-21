import messages from '../messages.json';

const categories = Object.keys(messages);

export function getCategory(activeWin) {
  if (!activeWin || !activeWin.title) {
    return null; // No window or title
  }

  const title = activeWin.title.toLowerCase();
  const appName = activeWin.owner.name.toLowerCase();

  for (const category of categories) {
    for (const keyword of messages[category].match) {
      const lowerKeyword = keyword.toLowerCase();
      if (title.includes(lowerKeyword) || appName.includes(lowerKeyword)) {
        console.log(`Matched keyword "${keyword}" in category "${category}"`); // Dev logging
        return category;
      }
    }
  }

  return null; // No match found
}
