const { exec } = require('child_process');

const commands = [
  'node ./tests/class-playwright-inloop-compare-index.js',
  'node ./tests/class-playwright-collecting-data-and-compare-index.js',
  'npx playwright test tests/hackerNewsTest.spec.js'
];

commands.forEach((command, index) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command ${index + 1}: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error output from command ${index + 1}: ${stderr}`);
      return;
    }
    console.log(`Output from command ${index + 1}: ${stdout}`);
  });
});