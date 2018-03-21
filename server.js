const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.post("/github", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}...`);
});
