/**
 * Define a dictionary of global variables.
 *
 * @type {Object}
 */
const GLOBALS = {
    // Constant to hold the search query param `limit`.
    QUERY_LIMIT: 5,
    // The Twitch.tv client-id.
    // FIXME: Remove this from the core-code and place it higher up in an .env file.
    CLIENT_ID: 'wnys7hbeeg9wrgvczr8kjnvcfkj86k',
    // Searh url for the Twitch.tv streams.
    CLIENT_URL: 'https://api.twitch.tv/kraken/search/streams',
    // Define a global state to keep in mind the old search query.
    // NOTE: This will be updated upon each successful API call.
    prevSearchQuery: '',
    // Define a global current page number.
    // NOTE: This will be updated as the user paginates between the pages.
    currentPageNumber: 1,
    // Define a global max page number.
    // NOTE: This will be updated when the user updates the search query.
    maxPageNumber: 1,
    // Define a global search query param `offset`.
    // NOTE: This will be updated upon each successful API call.
    queryOffset: 0
};
