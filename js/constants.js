/**
 * Define a global state to keep in mind the old search query.
 *
 * @type {String}
 */
let oldSearchQuery = '';

/**
 * The Twitch.tv client-id.
 * FIXME: Remove this from the core-code and place it higher up in an .env file.
 *
 * @type {String}
 */
const CLIENT_ID = 'wnys7hbeeg9wrgvczr8kjnvcfkj86k';

/**
 * Searh url for the Twitch.tv streams.
 *
 * @type {String}
 */
const CLIENT_URL = 'https://api.twitch.tv/kraken/search/streams';
