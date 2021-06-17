const path = require("path");
const express = require("express");

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "..", "app", "dist")));

const instance = app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);

  if (process.argv.includes("timeout")) {
    setTimeout(() => instance.close(), 5000);
  }
});
