// tests/hackerNewsTest.spec.js
import { expect, test } from '@playwright/test'
const { launchBrowser, gotoHackerNews, goGetTheFirst100Articles,isOrderedByTimestamp } = require('./index');


test('validate Hacker News articles are sorted from newest to oldest', async () => {
  const { browser, page } = await launchBrowser();
  const timeAgoArr = await goGetTheFirst100Articles(page);

  expect(isOrderedByTimestamp(timeAgoArr)).toBe(true);
  expect(timeAgoArr.length).toBe(100);
  // // Just for debugging purposes to see the expected output
  // // instead of seeing the test pass or fail in the terminal
  // console.log('timeAgoArr:', timeAgoArr);
  // console.log('timeAgoArr.length:', timeAgoArr.length);
  // console.log(isOrderedByTimestamp(timeAgoArr));

await browser.close(); // Clean up after the test
});