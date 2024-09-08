# 🐺 QA Wolf Take Home Assignment

Welcome to the QA Wolf take home assignment for our [QA Engineer](https://www.notion.so/qawolf/QA-Wolf-QA-Engineer-Remote-156203a1e476459ea5e6ffca972d0efe) role! We appreciate your interest and look forward to seeing what you come up with.

## My Solution

_I've created 3 slightly different solutions_, which can be run individually or running all 3 using the following:


1. `$ node ./tests/class-playwright-inloop-compare-index.js`.

2. `$ node ./tests/class-playwright-collecting-data-and-compare-index.js`.

3. `$ npx playwright test tests/hackerNewsTest.spec.js `.

4. Running All 3 Tests Using shell. `./run-tests.sh `. 
 - Expected Output:
 ```
100 Articles are sorted correctly!
An array of 100  is sorted in descending order? Yes

Running 1 test using 1 worker
[chromium] › hackerNewsTest.spec.js:6:5 › validate Hacker News articles are sorted from newest to oldest
timeAgoArr.length: 100
true
  1 passed (2.2s)

 ```

5. Running All 3 Tests Using Node.js. `node run-test.js`.
 - Expected Output:
 ```
node run-tests.js
Output from command 1: 100 Articles are sorted correctly!

Output from command 3: 
Running 1 test using 1 worker
[chromium] › hackerNewsTest.spec.js:6:5 › validate Hacker News articles are sorted from newest to oldest
timeAgoArr.length: 100
true
  1 passed (2.5s)

Output from command 2: An array of 100  is sorted in descending order? Yes

 ```


### Solution 1 
#### file: `class-playwright-inloop-compare-index.js`
#### Note! 
##### highest degree of validation in terms of relation between article's id and the dateTimeString being compared.


In this implementation i'm iterating over the tableRows and selecting 
based on the row's id which is mapped to span.age(which holds the dateTimeString) by it's child anchor-tag that holds a reference to that id.

While in the loop i'm comparing that extracted dateTime-string transformed to milliseconds with the next element in the series, using playwright's expect(). 

If the comparison fails the test will stop at the point of failure without any need to get the whole 100 records. 

### Solution 2.
#### file: `class-playwright-collecting-data-and-compare-index.js`.


In this implementation i'm Collecting EXACTLY the first 100 articles
and storing them into an array and then pass that array to a utility function to validate that it is sorted from newest to oldest.
Also i've chosen to use a different way of collecting the array . without relating it to the row above.


### Solution 3 using Playwright Test as the main file and index as utility.
#### file: `index.js`. And `hackerNewsTest.spec.js`


In this implementation i'm Collecting EXACTLY the first 100 articles
and storing them into an array and then pass that array to a utility function to validate that it is sorted from newest to oldest.
Also i've chosen to use a different way of collecting the array . without relating it to the row above.

### Question 2

Why do you want to work at QA Wolf? Please record a short, ~2 min video that includes:

1. Your answer 

2. A walk-through demonstration of your code, showing a successful execution

Post the link in `why_qa_wolf.txt` (Please use [Loom](https://www.loom.com) to record your response). The answer and walkthrough should be combined into *one* video.

## Frequently Asked Questions



### How do you decide who to hire?

We evaluate candidates based on three criteria:

- Technical ability (as demonstrated in the take home and final round)
- Customer service orientation (as this role is customer facing)
- Alignment with our values (captured [here](https://www.notion.so/qawolf/QA-Wolf-QA-Engineer-Remote-156203a1e476459ea5e6ffca972d0efe))

This means whether we hire you is based on how you do during our interview process, not on your previous experience (or lack thereof). Note that you will also need to pass a background check to work here as our customers require this.

### How can I help my application stand out?

We've found that our best hires have been the most enthusiastic throughout our process. If you are very excited about working here, please feel free to go above and beyond on this assignment.
