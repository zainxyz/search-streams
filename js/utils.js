/**
 * Format a given map of xhr params.
 *
 * @method formatParams
 * @param  {Object}     params The map of params
 * @return {String}            The url formatted params string
 */
function formatParams(params) {
    return params && typeof params === 'object'
        ? '?' +
              Object.keys(params)
                  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                  .join('&')
        : '';
}

/**
 * Normalize a list of streams with just the right amount of usable data.
 *
 * @method normalizeStreams
 * @param  {Array}          [streams=[]] The list of streams
 * @return {Array}                       The normalized list of streams
 */
function normalizeStreams(streams = []) {
    return streams
        ? streams.map(stream => ({
              description: stream.channel.status,
              displayName: stream.channel.display_name,
              gameName: stream.game,
              previewImg: stream.preview.medium,
              viewers: stream.viewers,
              url: stream.channel.url
          }))
        : [];
}

/**
 * Reset a couple of global values.
 *
 * @method resetGlobalValues
 */
function resetGlobalValues() {
    // Reset the current page number.
    GLOBALS.currentPageNumber = 1;
    // Reset the query offset.
    GLOBALS.queryOffset = 0;
    // Reset the max page number.
    GLOBALS.maxPageNumber = 1;
}
