/**
 * Promisify the vanilla jx XHR request to hit an API.
 *
 * @method makeRequest
 * @param  {String}    [method='']    The HTTP method to use
 * @param  {String}    [url='']       The URL to call
 * @param  {Object}    [params=null]  A set of optional params
 * @param  {Object}    [headers=null] A set of optional headers
 * @return {Promise}
 */
function makeRequest({ method = '', url = '', params = null, headers = null }) {
    return new Promise((resolve, reject) => {
        // Create an xhr request object.
        const xhr = new XMLHttpRequest();
        // Open the XHR request.
        xhr.open(method, url + formatParams(params));
        // Hook into the `onload` func.
        xhr.onload = function onload() {
            // Resolve for good requests.
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response));
            }
            // Reject for bad requests.
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        // Hook into the `onerror` func.
        xhr.onerror = function onerror() {
            // We just want to reject, always.
            reject(
                new Error(`Unable to complete the '${method}' request for ${url}. Please try again`)
            );
        };
        // Add in optional headers.
        if (headers) {
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        // Send the request!
        xhr.send();
    });
}

/**
 * Search Twitch.tv streams based on the user's query.
 *
 * @method searchStreams
 * @param  {String}      [query=''] The user's query
 * @return {Object}
 */
async function searchStreams(query = '') {
    try {
        // Fetch the stream results.
        const resp = await makeRequest({
            method: 'GET',
            url: GLOBALS.CLIENT_URL,
            headers: {
                'Client-Id': GLOBALS.CLIENT_ID
            },
            params: {
                query,
                limit: GLOBALS.QUERY_LIMIT,
                offset: GLOBALS.queryOffset
            }
        });
        const total = resp._total;
        // Determine the max number of pages.
        const maxPages = Math.ceil(total / GLOBALS.QUERY_LIMIT);
        // Set the global max pages.
        GLOBALS.maxPageNumber = maxPages;
        // Return a clean obj.
        return {
            maxPages,
            query,
            streams: normalizeStreams(resp.streams || []),
            total
        };
    } catch (e) {
        throw e;
    }
}

/**
 * Fetch results and render the DOM for a given search query.
 *
 * @method fetchResultsFor
 * @param  {String}        [query='']      The search query
 * @param  {Boolean}       [refetch=false] Should we refetch results for the same query?
 */
function fetchResultsFor(query = '', refetch = false) {
    // Catch an empty query.
    const searchText = query || GLOBALS.prevSearchQuery;
    // Either we want to refetch results for the same query,
    // or we want to fetch results for a new query.
    if (refetch || (searchText && searchText !== GLOBALS.prevSearchQuery)) {
        // Show the loader.
        toggleLoader(true);
        // Search the streams.
        searchStreams(searchText)
            .then(resp => {
                // Clean out the old UI.
                cleanSearchResults();
                // Build the header elements (message + pagination).
                buildHeader(resp);
                // Build the UI.
                resp.streams &&
                    Array.isArray(resp.streams) &&
                    resp.streams.forEach(buildSearchResultItem);
                // Update the prevSearchQuery value.
                GLOBALS.prevSearchQuery = searchText;
            })
            .catch(err => {
                // Find some elements.
                const msg = document.getElementById('msg');
                // Update msg to let the user know we were unable to find results for their query.
                msg.innerHTML = `
                    Sorry, an error occured.
                    <br />
                    <code>${err.message}</code>
                `;
            })
            .finally(() => {
                // Hide the loader.
                toggleLoader();
            });
    }
}
