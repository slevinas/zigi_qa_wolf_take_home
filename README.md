# 🐺 QA Wolf Take Home Assignment

Welcome to the QA Wolf take home assignment for our [QA Engineer](https://www.notion.so/qawolf/QA-Wolf-QA-Engineer-Remote-156203a1e476459ea5e6ffca972d0efe) role! We appreciate your interest and look forward to seeing what you come up with.

## My Solution

_I've created 3 slightly different solutions_, which can be run using the following:


1. `$ node ./tests/class-playwright-inloop-compare-index.js`.

2. `$ node ./tests/class-playwright-collecting-data-and-compare-index.js`.

3. `$ npx playwright test tests/hackerNewsTest.spec.js --debug `.


### Solution 1 
#### file: `class-playwright-inloop-compare-index.js`

In this implementation i'm iterating over the tableRows and selecting 
based on the row's id which is mapped to span.age(which holds the dateTimeString) by it's child anchor-tag that holds a reference to that id.

While in the loop i'm comparing that extracted dateTime-string transformed to milliseconds with the next element in the series, using playwright's expect(). 

If the comparison fails the test will stop at the point of failure without any need to get the whole 100 records. 

### Solution 2.
#### file: `class-playwright-collecting-data-and-compare-index.js`.


In this implementation i'm Collecting EXACTLY the first 100 articles
and storing them into an array and then pass that array to a utility function to validate that it is sorted from newest to oldest.

### Question 2

Why do you want to work at QA Wolf? Please record a short, ~2 min video that includes:

1. Your answer 

2. A walk-through demonstration of your code, showing a successful execution

Post the link in `why_qa_wolf.txt` (Please use [Loom](https://www.loom.com) to record your response). The answer and walkthrough should be combined into *one* video.

## Frequently Asked Questions

### What is your hiring process? When will I hear about next steps?

This take home assignment is the first step in our hiring process, followed by a final round interview if it goes well. **We review every take home assignment submission and promise to get back to you either way within one week (usually sooner).** The only caveat is if we are out of the office, in which case we will get back to you when we return. If it has been more than one week and you have not heard from us, please do follow up.

The final round interview is a 2-hour technical work session that reflects what it is like to work here. We provide a $150 stipend for your time for the final round interview regardless of how it goes. After that, there may be a short chat with our director about your experience and the role.

Our hiring process is rolling where we review candidates until we have filled our openings. If there are no openings left, we will keep your contact information on file and reach out when we are hiring again.

### How do you decide who to hire?

We evaluate candidates based on three criteria:

- Technical ability (as demonstrated in the take home and final round)
- Customer service orientation (as this role is customer facing)
- Alignment with our values (captured [here](https://www.notion.so/qawolf/QA-Wolf-QA-Engineer-Remote-156203a1e476459ea5e6ffca972d0efe))

This means whether we hire you is based on how you do during our interview process, not on your previous experience (or lack thereof). Note that you will also need to pass a background check to work here as our customers require this.

### How can I help my application stand out?

We've found that our best hires have been the most enthusiastic throughout our process. If you are very excited about working here, please feel free to go above and beyond on this assignment.
