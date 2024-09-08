const { expect } = require("@playwright/test")
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
        let tableRows;
        let count;
        // Go to Hacker News "Newest" page
        await page.goto('https://news.ycombinator.com/newest');

        while (timeAgoArr.length < 100) {
            // Wait for articles to load
            await page.waitForSelector('span.age'); // Ensure that articles are 
             tableRows =  page.locator('span.age');
            count = await tableRows.count();

            // Collect articles' timestamps
            for (let i = 0; i < count && timeAgoArr.length < 100; i++) {
               
                const timeStampStr = await tableRows.nth(i).getAttribute('title');
               
                if (timeStampStr) {
                    timeAgoArr.push(new Date(timeStampStr)); // Convert the timestamp string to a Date object
                } else {
                    console.error('While collecting timestamps: No timestamp found');
                    throw new Error("No timestamp found");
                    
                }
            }

            // Click the "more" button to load the next set of articles
            if (timeAgoArr.length < 100) {
                await page.click('a.morelink');
                await page.waitForTimeout(2000); // Wait for the next page to load
            }
        }

        // Validate we have exactly 100 timestamps
       expect(timeAgoArr.length).toBe(100);


        // // Check if the timestamps are sorted from newest to oldest
        const isOrdered = isOrderedByTimestamp(timeAgoArr);
        expect(isOrdered).toBe(true);
        console.log(`Is the array sorted in descending order? ${isOrdered ? 'Yes' : 'No'}`);

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

