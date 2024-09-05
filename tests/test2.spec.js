// tests/test1.spec.js
const { test, expect } = require('@playwright/test');
const { sortHackerNewsArticles } = require('./index');

function isOrderedByTimestamp(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const currentTime = new Date(arr[i]).getTime(); // Convert current timestamp string to milliseconds
    const nextTime = new Date(arr[i + 1]).getTime(); // Convert next timestamp string to milliseconds

    if (currentTime < nextTime) {
      return false; // If not ordered correctly
    }
  }
  return true; // If all are ordered correctly
}

test('Locate subline element', async () => {
  // Launch the browser and navigate to Hacker News
  const { browser, page } = await sortHackerNewsArticles();
    // Go to Hacker News
    await page.goto("https://news.ycombinator.com/newest");

  let currentIdx = 0;
  let timeAgoArr = [];

  // Locate the "More" link
  const moreLink = page.locator('a.morelink', { hasText: 'More' });

  // Ensure the "More" link is visible
  await expect(moreLink).toBeVisible();

  while (currentIdx < 100) {
    // Locate subline elements
    const rows = page.locator('span.subline');
    let count = await rows.count();

    for (let i = 0; i < count && currentIdx < 100; ++i) {
      const timeStampStr = await rows.nth(i).locator('span.age').getAttribute('title');
      timeAgoArr[currentIdx] = timeStampStr;
      currentIdx++;
    }

    if (currentIdx >= 99) break;

    await moreLink.click();

    // Validating pagination and ordering
    if (currentIdx === 30) {
      expect(await page.locator('span.rank').nth(0).innerText()).toBe('31.');
    } else if (currentIdx === 60) {
      expect(await page.locator('span.rank').nth(0).innerText()).toBe('61.');
    } else if (currentIdx === 90) {
      expect(await page.locator('span.rank').nth(0).innerText()).toBe('91.');
    }
  }

  // Validate that the timestamps are in order and that we have collected 100 timestamps
  expect(isOrderedByTimestamp(timeAgoArr)).toBe(true);
  expect(timeAgoArr.length).toBe(100);

  // Close the browser after the test is done
  await browser.close();
});