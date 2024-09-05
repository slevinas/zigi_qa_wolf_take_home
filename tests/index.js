
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();



  // Return the page object for further use
  return { browser, context, page };
}

module.exports = { sortHackerNewsArticles };