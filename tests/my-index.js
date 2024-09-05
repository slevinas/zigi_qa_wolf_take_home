// ./tests/index.js
const { chromium } = require("playwright");

async function validateHackerNewsArticles() {
    // Launch the browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Go to Hacker News "Newest" page
        await page.goto("https://news.ycombinator.com/newest");

        // Wait for the articles to load
        await page.waitForSelector('tr.athing'); // Wait for at least one article to load

        // Array to hold the article timestamps
        const timeAgoArr = [];

        // Locate the article rows
        const articles = await page.$$('tr.athing');

        for (let i = 0; i < Math.min(articles.length, 100); i++) {
            const article = articles[i];
            // Get the timestamp of each article (the content of the "age" span)
            const timeStampStr = await article.$eval('span.age', el => el.getAttribute('title'));

            if (timeStampStr) {
                timeAgoArr.push(timeStampStr); // Push the timestamp into the array
            }
        }

        // Check if we have exactly 100 timestamps
        if (timeAgoArr.length !== 100) {
            console.error(`Expected 100 articles, but found ${timeAgoArr.length}.`);
            await page.screenshot({ path: 'screenshot.png' }); // Take a screenshot for debugging
            return;
        }

        // Convert timestamps to Date objects for sorting validation
        const timestampsAsDate = timeAgoArr.map(timeStamp => new Date(timeStamp));

        // Validate that the articles are sorted from newest to oldest
        const isSorted = timestampsAsDate.every((time, index) => {
            if (index === 0) return true; // First element is always considered sorted
            return timestampsAsDate[index - 1] >= time; // Check for descending order
        });

        // Output the sorting result
        console.log(`Articles sorted from newest to oldest: ${isSorted ? 'Yes' : 'No'}`);

    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        // Close the browser
        await browser.close();
    }
}

// Execute the function
validateHackerNewsArticles();