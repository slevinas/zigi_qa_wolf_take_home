const { chromium } = require("playwright");

function isOrderedByTimestamp(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        const currentTime = new Date(arr[i]).getTime();
        const nextTime = new Date(arr[i + 1]).getTime();
        if (currentTime < nextTime) {
            console.log(`Order fails between elements at index ${i} and ${i + 1}: ${arr[i]} < ${arr[i + 1]}`);
            return false;
        }
    }
    return true;
}

async function sortHackerNewsArticles() {
    // Launch the browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Array to hold the article timestamps
        const timeAgoArr = [];

        // Go to Hacker News "Newest" page
        await page.goto('https://news.ycombinator.com/newest');

        while (timeAgoArr.length < 100) {
            // Wait for articles to load
            await page.waitForSelector('span.subline'); // Ensure that articles are loaded

            // Locate article rows
            const articles = await page.$$('span.subline');
            console.log(`Current page articles.length`, articles.length);

            // Collect articles' timestamps
            for (let i = 0; i < articles.length && timeAgoArr.length < 100; i++) {
                const article = articles[i];
                const timeStampStr = await article.$eval('span.age', el => el.getAttribute('title'));
                if (timeStampStr) {
                    timeAgoArr.push(new Date(timeStampStr)); // Convert the timestamp string to a Date object
                }
            }

            // Click the "more" button to load the next set of articles
            if (timeAgoArr.length < 100) {
                await page.click('a.morelink');
                await page.waitForTimeout(2000); // Wait for the next page to load
            }
        }

        // Validate we have exactly 100 timestamps
        if (timeAgoArr.length !== 100) {
            console.error(`Expected 100 articles, but found ${timeAgoArr.length}.`);
            return; // Exit if the count is incorrect
        }

        // console.log(`Collected ${timeAgoArr.length} article timestamps.`);
        // console.log(`First timestamp: ${timeAgoArr[0]}`);
        // console.log(`Last timestamp: ${timeAgoArr[timeAgoArr.length - 1]}`);
        // console.log('timeAgoArr', timeAgoArr);

        // // Check if the timestamps are sorted from newest to oldest
        // const isSorted = timeAgoArr.every((time, index) => {
        //     if (index === 0) return true; // Skip the first element
        //     if (time.getTime() < timeAgoArr[index - 1].getTime()) {
        //         console.log(`Order fails between elements at index ${index - 1} and ${index}: ${timeAgoArr[index - 1]} < ${time}`);
        //         return false;
        //     }
        //     return true;
        // });

        // Output the sorting result
        // console.log(`Articles sorted from newest to oldest: ${isSorted ? 'Yes' : 'No'}`);

        console.log(`Is the array sorted by timestamp from larger to smallest? ${isOrderedByTimestamp(timeAgoArr) ? 'Yes' : 'No'}`);

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

Collecting Article Timestamps:

Uses page.$$('tr.athing') to get an array of article rows.
Extracts the timestamp from the "age" span by using the getAttribute('title') method.
Each timestamp string is converted to a JavaScript Date object for comparison.
Validation:

Checks that exactly 100 articles are found.
Validates that the timestamps are sorted from newest to oldest by comparing each timestamp with its predecessor.
Output: Console logs whether the articles are sorted correctly.

Error Handling: Implements basic error handling to catch and log any issues that arise during execution.

Cleanup: Closes the browser instance in the finally block to ensure resources are freed.

Step 3: Run the Script
After editing the index.js file, you can run the script using the following command in your terminal:

node tests/index.js

*/