/**
 * Handle the 'enter' keypress on the search input.
 *
 * @method handleOnSearchInputKeyup
 * @param  {Object}                 e The synthetic event.
 * @return {null}
 */
function handleOnSearchInputKeyup(e) {
    if (e.keyCode === 13) {
        const query = e.target.value;
        // Reset some global values.
        resetGlobalValues();
        // If we have a valid query, then fetch the results for it.
        query && fetchResultsFor(query);
    }
}

/**
 * Handle the onClick of the search button.
 *
 * @method handleOnSearchInputBtnClick
 */
function handleOnSearchInputBtnClick() {
    // Find the input.
    const searchInput = document.getElementById('searchInput');
    // If there is a valid value present, then fetch results and render to DOM.
    // Otherwise, bring the search input into focus.
    if (searchInput.value) {
        // Reset some global values.
        resetGlobalValues();
        // Fetch the search results.
        fetchResultsFor(searchInput.value);
    } else {
        searchInput.focus();
    }
}

/**
 * Handle the onClick of the next and prev pagination buttons.
 *
 * @method handleOnClickPageBtn
 * @param  {Boolean}            prev Are we going back to the prev page?
 * @return {Function}
 */
function handleOnClickPageBtn(prev) {
    if (prev) {
        return function onClick(e) {
            if (GLOBALS.currentPageNumber !== 1) {
                // Decrement the current page number.
                GLOBALS.currentPageNumber -= 1;
                // Decrement the query offset based on the query limit.
                GLOBALS.queryOffset -= GLOBALS.QUERY_LIMIT;
                // Re-fetch the search results.
                fetchResultsFor();
            }
        };
    }
    return function onClick(e) {
        // If we're not at the max page count.
        if (GLOBALS.currentPageNumber <= GLOBALS.maxPageNumber) {
            // Increment the current page number.
            GLOBALS.currentPageNumber += 1;
            // Increment the query offset based on the query limit.
            GLOBALS.queryOffset += GLOBALS.QUERY_LIMIT;
            // Re-fetch the search results.
            fetchResultsFor();
        }
    };
}
