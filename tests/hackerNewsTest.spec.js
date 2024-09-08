
import { expect, test } from '@playwright/test'
const { launchBrowser, gotoHackerNews, goGetTheFirst100ArticlesTimeStamp,isOrderedByTimestamp } = require('./index');


test('validate Hacker News articles are sorted from newest to oldest', async () => {
  const {  page, browser } = await launchBrowser();
  const timeAgoArr = await goGetTheFirst100ArticlesTimeStamp(page);

  expect(isOrderedByTimestamp(timeAgoArr)).toBe(true);
  expect(timeAgoArr.length).toBe(100);
  // Just  to see the  output
  // instead of seeing the test pass or fail in the terminal
  console.log('timeAgoArr.length:', timeAgoArr.length);
  console.log(isOrderedByTimestamp(timeAgoArr));



await browser.close(); // Clean up after the test

// Runnig the test:
// npx playwright test tests/hackerNewsTest.spec.js --headed --debug optional.
});