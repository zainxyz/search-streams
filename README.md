# Search Streams

Search for Twitch.tv streams based on a specified `query` parameter.

A stream is returned if the query parameter is matched entirely or partially, in the channel description or game name.

## Local Development?

Clone the repo and change to its directory:

```bash
www $ git clone https://github.com/zainxyz/search-streams.git && cd search-streams
search-streams $ _
```

Install a small server to serve this static application:

```bash
# yarn
search-streams $ yarn add global serve
# npm
search-streams $ npm i -g serve
```

Now serve the current `search-streams/` directory:

```bash
zain in search-streams (master) $ serve .

   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   Serving!                                       │
   │                                                  │
   │   - Local:            http://localhost:5000      │
   │   - On Your Network:  http://127.0.0.1:5000      │
   │                                                  │
   │   Copied local address to clipboard!             │
   │                                                  │
   └──────────────────────────────────────────────────┘
```

Visit `http://localhost:5000` in the browser of your choice.

Start editing the app, and refresh the browser.

Happy Coding! 🎉
