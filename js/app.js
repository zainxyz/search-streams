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

/**
 * The main bootstrap function.
 *
 * @method bootstrap
 */
function bootstrap() {
    // Find some elements.
    const searchInput = document.getElementById('searchInput');
    const searchInputBtn = document.getElementById('searchInputBtn');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    // Add event listeners to the `input` and `input btn` elements.
    searchInputBtn.addEventListener('click', handleOnSearchInputBtnClick);
    searchInput.addEventListener('keyup', handleOnSearchInputKeyup);
    // Add event listeners to the `prev` and `next` page buttons.
    prevPageBtn.addEventListener('click', handleOnClickPageBtn(true));
    nextPageBtn.addEventListener('click', handleOnClickPageBtn());
}

// On DOM load, attach the `bootstrap` func.
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', bootstrap, false);
} else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', bootstrap);
} else {
    window.onload = bootstrap;
}
