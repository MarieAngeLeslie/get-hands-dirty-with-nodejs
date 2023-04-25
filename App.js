const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("yeah i'm there");
});

app.listen(port, () => {
  console.log(`my server start very well ${port}`);
});
