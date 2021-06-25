const path = require("path");
const express = require("express");
const createTestCafe = require("testcafe");

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "..", "dist")));

const instance = app.listen(port, async () => {
  const testCafe = await createTestCafe("localhost", 1337, 1338);

  const failedCount = await testCafe
    .createRunner()
    .src(path.join(__dirname, "..", "e2e", "*"))
    .browsers(["chrome"])
    // .browsers(["chromium:headless"])
    .run();

  instance.close();
  process.exit(failedCount ? 1 : 0);
});
