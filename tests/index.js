// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");



async function launchBrowser() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  return { browser, context, page };
}

// Additional utility functions can go here
async function gotoHackerNews(page) {
  await page.goto("https://news.ycombinator.com/newest");
}

function isOrderedByTimestamp(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const currentTime = new Date(arr[i]).getTime();
    const nextTime = new Date(arr[i + 1]).getTime();
    if (currentTime < nextTime) {
      return false;
    }
  }
  return true;
}


async function goGetTheFirst100ArticlesTimeStamp(page) {
  await gotoHackerNews(page);
  let currentIdx = 0; // Index of the current article

  // Array to hold the timestamps of the articles
  let timeAgoArr = [];


  // Locate the "More" link (pagination)
  const moreLink = page.locator('a.morelink', { hasText: 'More' });
  // await expect(moreLink).toBeVisible();
  while (currentIdx < 100) {
    const rows = page.locator('span.subline');
    // await rows.waitFor();
    let count = await rows.count();

    for (let i = 0; i < count && currentIdx < 100; ++i) {
      const timeStampStr = await rows.nth(i).locator('span.age').getAttribute('title');
      timeAgoArr[currentIdx] = timeStampStr;
      currentIdx++;
    }

    if (currentIdx >= 99) break; // Break if we have collected 100 timestamps already otherwise click on the "More" link
    await moreLink.waitFor();
    await moreLink.click();
  }

  return timeAgoArr;

}

module.exports = { launchBrowser, gotoHackerNews, goGetTheFirst100ArticlesTimeStamp, isOrderedByTimestamp };