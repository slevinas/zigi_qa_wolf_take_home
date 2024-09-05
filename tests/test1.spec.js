// tests/someTest.spec.js
const { test, expect } = require('@playwright/test');
const { sortHackerNewsArticles } = require('./index');
// tests/test1.spec.js


// function parseTimeAgo(timeAgo) {
//   const timeUnits = {
//     'second': 1000,
//     'seconds': 1000,
//     'minute': 1000 * 60,
//     'minutes': 1000 * 60,
//     'hour': 1000 * 60 * 60,
//     'hours': 1000 * 60 * 60,
//     'day': 1000 * 60 * 60 * 24,
//     'days': 1000 * 60 * 60 * 24
//     // Add more units as necessary
//   };
  
//   const [value, unit] = timeAgo.split(' '); // Split the string into value and unit
//   return parseInt(value) * timeUnits[unit]; // Return the number of milliseconds
// }

// function isOrderedByTimeAgo(arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     const currentTime = parseTimeAgo(arr[i].timeAgo);
//     const nextTime = parseTimeAgo(arr[i + 1].timeAgo);

//     // Change the comparison as needed
//     // For ascending order
//     if (currentTime < nextTime) {
//       return false; // If not ordered correctly
//     }
//   }
//   return true; // If all are ordered correctly
// }


function isOrderedByTimestamp(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const currentTime = new Date(arr[i]).getTime(); // Convert current timestamp string to milliseconds
    const nextTime = new Date(arr[i + 1]).getTime(); // Convert next timestamp string to milliseconds

    // Check if the current timestamp is less than the next one for ascending order
    if (currentTime < nextTime) {
      return false; // If not ordered correctly
    }
  }
  return true; // If all are ordered correctly
}



test('Locate subline element', async ({ page }) => {

  // page.on('console', msg => console.log(msg.text()));


  // Go to the page containing the element
  await page.goto('https://news.ycombinator.com/newest');

  // Locate the subline element
  // const sublineElements = page.locator('span.subline');
// 
  /*
  inside the subline element, there are the following elements:
  <span class="age" title="2024-09-04T21:33:46.000000Z"><a href="item?id=41451107">18 hours ago</a></span>
  */

  //iterate elements:
  // for (const row of await page.locator('span.subline').filter({ has: page.locator('span.age')}).all()) {
  //   console.log(await row.textContent());
  //   // console.log('row.innerText():', await  row.innerText());
  //   // console.log('row.value():', await  row.value());
  
  //   // console.log('row.getAttribute(title):', await  row.getAttribute('title'));
  
    
  // }
  let timeAgoArr = [];

  // for (const row of await page.locator('span.subline').all()) {
  //   console.log(await row.textContent());
  
  //   // Locate all age elements within the subline element
  //   const ageElement =  row.locator('span.age');
  
  //   // Extract and log the title attribute of each age element
  //   // for (const ageElement of ageElements) {
  //     const timeAgo = await ageElement.getAttribute('title');

  //   //   console.log('Time Ago:', timeAgo);
  //   //    // Convert the title attribute to a local date string
  //   // const dateObject = new Date(timeAgo);
  //   // const localDateString = dateObject.toLocaleString();
  //   // console.log('Local Date:', localDateString);
  //   // }
  // }
  // let currentIdx = 0;
  // let rows =  page.locator('span.subline');
  // let count = await rows.count();
  // console.log('count:', count);
  // for (let i = 0; i < count; ++i){
  //   // console.log(await rows.nth(i).textContent());
  //   const timeStampStr = await rows.nth(i).locator('span.age').getAttribute('title');
  //   timeAgoArr[i] = timeStampStr
  // //  console.log('timeStampStr:', timeStampStr);
  // //  const dateObject = new Date(timeStampStr);
  //   // const localDateString = dateObject.toLocaleString();
  //   // console.log('Local Date:', localDateString);
  //   // await page.pause();
  // }

  // console.log('timeAgoArr:', timeAgoArr);
  // console.log('timeAgoArr.length:', timeAgoArr.length);
  // console.log(isOrderedByTimestamp(timeAgoArr));
    // await page.pause();

// <a href="newest?next=41450875&amp;n=61" class="morelink" rel="next">More</a>
 // Locate the "More" link
 const moreLink = page.locator('a.morelink', { hasText: 'More' });

 // Ensure the "More" link is visible
 await expect(moreLink).toBeVisible();





 // Optionally, click the "More" link
//  await moreLink.click();
//  const elementNum31 =  page.locator('span.rank').nth(0);

//  expect(await elementNum31.innerText()).toBe('31.');
 
 let currentIdx = 0;
 let currentPagination = 1;
 while (currentIdx < 99) {
  let rows =  page.locator('span.subline');
  let count = await rows.count();

  for (let i = 0; i < count; ++i){
    // console.log(await rows.nth(i).textContent());
    if (currentIdx <= 99) {
    const timeStampStr = await rows.nth(i).locator('span.age').getAttribute('title');
    
      timeAgoArr[currentIdx] = timeStampStr
      
    }else {
      break;
    }
    
  //  console.log('timeStampStr:', timeStampStr);
  //  const dateObject = new Date(timeStampStr);
    // const localDateString = dateObject.toLocaleString();
    // console.log('Local Date:', localDateString);
    currentIdx++;
    
  }
  await moreLink.click();
  // console.log('just clicked More');
  // console.log('currentIdx:', currentIdx);
  // await page.pause();
  if (currentIdx === 30) {
 expect(await page.locator('span.rank').nth(0).innerText()).toBe('31.');
    
  }else if (currentIdx === 60) {
    expect(await page.locator('span.rank').nth(0).innerText()).toBe('61.');
  
 } else if (currentIdx === 90) {
    expect(await page.locator('span.rank').nth(0).innerText()).toBe('91.');
  
 }
 if (currentIdx === 99) {
  expect(await page.locator('span.rank').nth(0).innerText()).toBe('100.');
  break;
  
 }
//  await page.pause();
 
  // Ensure the subline element is visible
  // await expect(sublineElement).toBeVisible();

  // Optionally, you can interact with the subline element or its children
  // const scoreElement = sublineElement.locator('span.score');
  // const scoreText = await scoreElement.innerText();
  // console.log('Score:', scoreText);

  // Pause the page to inspect the UI
  await page.pause();
 }
 console.log('timeAgoArr:', timeAgoArr);
 console.log('timeAgoArr.length:', timeAgoArr.length);
 expect(isOrderedByTimestamp(timeAgoArr)).toBe(true);
 expect(timeAgoArr.length).toBe(100);
 
});

test.skip('Hacker News articles are sorted correctly', async () => {
  const { browser, context, page } = await sortHackerNewsArticles();

  // Example test: Check if there are articles on the page
  const articles = await page.$$('.storylink');  // Selector for article links
  expect(articles.length).toBeGreaterThan(0);

  await page.pause();

  // Added: Check if the title of the first article exists
  const firstArticle = await articles[0].innerText();
  expect(firstArticle).not.toBeNull();

  // Close the browser
  await browser.close();
});


test.skip('Getting to the API-UI', async ({ page }) => {
  // go to Hacker News
  // await page.goto("https://news.ycombinator.com/newest");
  await page.goto("localhost:3000");



 // Get the <tbody> element
//  const tableBody =  page.locator('tbody').first();
//  await tableBody.waitFor();
  // expect(title).toBe("New Links | Hacker News");
  /*
  Error: locator.waitFor: Error: strict mode violation: locator('tbody') resolved to 4 elements:
        1) <tbody>…</tbody> aka getByText('Hacker News new | past | comments | ask | show | jobs | submit login 1. Track')
        2) <tbody>…</tbody> aka getByRole('cell', { name: 'Hacker News new | past | comments | ask | show | jobs | submit login' }).getByRole('rowgroup')
        3) <tbody>…</tbody> aka getByText('Track and field body types by event (2016) (track-stats.com) 1 point by myroon5')
        4) <tbody>…</tbody> aka getByRole('row', { name: 'Guidelines | FAQ | Lists |' }).getByRole('rowgroup')

  */
  // Pause the page to inspect the UI
  await page.pause();
    // Set a breakpoint here using the Playwright inspector
    // debugger;
});


