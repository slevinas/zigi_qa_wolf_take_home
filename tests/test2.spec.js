// tests/test1.spec.js
const { test, expect } = require('@playwright/test');

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

test('Locate subline element and validate timestamps', async () => {
  const { browser, page } = await launchBrowser();
  await gotoHackerNews(page);

  let currentIdx = 0;
  let timeAgoArr = [];
  const moreLink = page.locator('a.morelink', { hasText: 'More' });
  
  await expect(moreLink).toBeVisible();

  while (currentIdx < 100) {
    const rows = page.locator('span.subline');
    let count = await rows.count();

    for (let i = 0; i < count && currentIdx < 100; ++i) {
      const timeStampStr = await rows.nth(i).locator('span.age').getAttribute('title');
      timeAgoArr[currentIdx] = timeStampStr;
      currentIdx++;
    }

    if (currentIdx >= 99) break;

    await moreLink.click();
  }

  expect(isOrderedByTimestamp(timeAgoArr)).toBe(true);
  expect(timeAgoArr.length).toBe(100);

  await browser.close(); // Clean up after the test
});