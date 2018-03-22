# Github SSH API

A simple API that takes an array of Github usernames and returns their SSH keys.

# Before you start

If you plan on making a lot of requests with this API, be sure to get an OAuth token from Github (go to your settings and click "Developer settings" to register a new app) and create a config.json. Otherwise, remove the require statement for the config file as well as modify the axios request URL.

# Instructions

    # Install dependencies
    npm install

    # Serve on localhost:8000
    npm start
    
    # Use a REST client such as Postman to send a POST request to /github-keys with array of usernames in the request body.
    # e.g. { usernames: ["John Smith", "Jane Doe"] }
