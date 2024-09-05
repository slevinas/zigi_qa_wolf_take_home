// ./tests/index.js
const { chromium } = require("playwright");

async function fetchHackerNewsArticles() {
    // Launch the browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Go to Hacker News "Newest" page
        await page.goto("https://news.ycombinator.com/newest");

        // Wait for the articles to load
        await page.waitForSelector('tr.athing');

        // Array to hold the article timestamps
        const timeAgoArr = [];

        // Locate article rows
        const articles = await page.$$('tr.athing');

        // Collect timestamps for the first 100 articles
        for (let i = 0; i < Math.min(articles.length, 100); i++) {
            const article = articles[i];
            const timeStampStr = await article.$eval('span.age', el => el.getAttribute('title'));
            if (timeStampStr) {
                timeAgoArr.push(new Date(timeStampStr)); // Convert to Date object
            }
        }

        // Return the timestamps and number of articles collected
        return { timeAgoArr, count: timeAgoArr.length };
    } catch (error) {
        console.error("An error occurred:", error);
        throw error; // Propagate the error for handling in test
    } finally {
        // Ensure the browser is closed
        await browser.close();
    }
}

module.exports = { fetchHackerNewsArticles };