// import libraries and config file
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const config = require("./config.json");

// define port for server to listen on
const PORT = process.env.PORT || 8000;

// configure Express to send JSON response
app.use(bodyParser.json());

// define Github endpoint
app.post("/github-keys", async (req, res) => {
  // users array is either non-existent or empty
  // send error and return
  if (!req.body.users || !req.body.users.length) {
    return res.status(400).json({
      err: "Body must contain a non-empty array of Github usernames."
    });
  }
  const { users } = req.body;
  const results = {};

  // get Github data for each user and save to results object
  await Promise.all(
    users.map(async user => {
      // check if username array has duplicates
      if (results[user]) {
        return user;
      }
      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${user}/keys?client_id=${
            config.CLIENT_ID
          }&client_secret=${config.CLIENT_SECRET}`
        );
        // Github username exists
        results[user] = data;
      } catch (e) {
        // Github username not found
        results[user] = [];
      }
      return results;
    })
  );
  // send back results
  return res.status(200).json(results);
});

// start server on port
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}...`);
});

module.exports = app;
