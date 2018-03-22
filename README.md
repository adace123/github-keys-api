# Github SSH API

A simple API that takes an array of Github usernames and returns their SSH keys.

# Before you start

If you plan on making a lot of requests with this API, be sure to get an OAuth token from Github (go to your settings and click "Developer settings" to register a new app) and create a config.json. Otherwise, remove the require statement for the config file as well as modify the axios request URL.

# Instructions

    # Install dependencies
    npm install

    # Serve on localhost:8000
    npm start
