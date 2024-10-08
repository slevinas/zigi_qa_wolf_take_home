# 🐺 QA Wolf Take Home Assignment

 
## Welcome to My Solution to the QA Wolf take home assignment for role! [QA Engineer](https://www.notion.so/qawolf/QA-Wolf-QA-Engineer-Remote-156203a1e476459ea5e6ffca972d0efe) :

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install 
```

_I've created 3 slightly different solutions_, which can be run individually or running all 3 using the following:

#### Running individual tests:

1. `$ node ./tests/class-playwright-inloop-compare-index.js`.

2. `$ node ./tests/class-playwright-collecting-data-and-compare-index.js`.

3. `$ npx playwright test tests/hackerNewsTest.spec.js `.

#### Running All 3 Tests Using shell. 
4. `./run-tests.sh `. 

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

#### Running All 3 Tests Using Node.js.
5.  `node run-test.js`.

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


In this implementation i'm Collecting the first 100 articles
and storing them into an array and then passing that array to a utility function to validate that it is sorted from newest to oldest.
Also i've chosen to use a different way of collecting the array . without relating it to the row above.


### Solution 3 using Playwright Test as the main file and index.js as utility.
#### file: `index.js`. And `hackerNewsTest.spec.js`


In this implementation i'm using an imported Utility function  from the index.js file

  _"goGetTheFirst100ArticlesTimeStamp()"_


which Returns an array of the first 100 dateTimeSrtings and then passing this array to 
another utility function to return a true/false upon check and using that with playwright's expect within it's test() function. 

Thank you :
Sagi Levinas (Zigi)

