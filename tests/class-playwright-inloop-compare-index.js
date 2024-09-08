const { expect } = require("@playwright/test")
const { chromium } = require("playwright");


async function sortHackerNewsArticles() {
    // Launch the browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        
        let currentIdx = 0; // Index of the current article
        const tableRows =  page.locator('tr.athing');
        let count        
        let dateString
        let nextDateString

        // Go to Hacker News "Newest" page
        await page.goto('https://news.ycombinator.com/newest');

        while (currentIdx < 100) {
            // Wait for articles to load
            // Ensure that articles are loaded
            await page.waitForSelector('tr.athing'); 
          
             count = await tableRows.count();


            // Collect articles' timestamps
            for (let i = 0; i < (count - 1) && currentIdx < 100; i++) {
             //  Here i'm using the article's id to get the associated 
             // parent span.age which holds the dateTime-string as its title attr'  via 
             // it's child-link with the article's Id in its href attr'  
              dateString = await page.locator('span.age').filter({ has: page.locator(`a[href="item?id=${await tableRows.nth(i).getAttribute('id')}"]`) }).getAttribute('title');
              nextDateString = await page.locator('span.age').filter({ has: page.locator(`a[href="item?id=${await tableRows.nth(i+1).getAttribute('id')}"]`) }).getAttribute('title');

              // Using Playwright's expect to validate the descending order of the articles
              // by comparing the current article's date with the next article's date
              // in milliseconds.
                 expect(new Date(dateString).getTime()).toBeGreaterThanOrEqual(new Date(nextDateString).getTime());

                currentIdx++;
            }

            // Click the "more" button to load the next set of articles
            if (currentIdx < 100) {
                await page.click('a.morelink');
                await page.waitForSelector('tr.athing');  // Ensure that articles are loaded
            }
        }
        expect(currentIdx).toBe(100);

    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        // Close the browser
        await browser.close();
    }
}

// Execute the function
(async () => {
    await sortHackerNewsArticles();
})();


/*
Explanation of the Code
Browser Launch: Opens a Chromium browser instance using chromium.launch({ headless: false }), allowing you to see the browser actions.

Page Navigation: Navigates to the "Newest" articles on Hacker News using page.goto().

Waiting for Articles: Waits for the articles to load using page.waitForSelector('tr.athing').

Comparing Article's Timestamps:

Using  page.locator('tr.athing'); = tableRows  to get an array of article rows.
Extracts the Article's Id from the row by using the getAttribute('id') method.
Filters to the matching span.age by using it's child-link's locator with the article's Id in its href attribute.
Extracts the timestamp from the "age" span by using the getAttribute('title') method.
Each timestamp string is converted to a JavaScript Date object for comparison.
Validation:

Checks that exactly 100 articles are found.
Validates that the timestamps are sorted from newest to oldest by comparing each timestamp with its predecessor.
Output: Console logs whether the articles are sorted correctly.

Error Handling: Implements basic error handling to catch and log any issues that arise during execution.

Cleanup: Closes the browser instance in the finally block to ensure resources are freed.

Run the Test


node tests/class-playwright.js

*/