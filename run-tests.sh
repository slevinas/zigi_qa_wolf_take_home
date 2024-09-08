#!/bin/bash

# Run the first file
node ./tests/class-playwright-inloop-compare-index.js &&

# Run the second file
node ./tests/class-playwright-collecting-data-and-compare-index.js &&

# Run the third file
npx playwright test tests/hackerNewsTest.spec.js