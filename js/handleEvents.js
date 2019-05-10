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
        fetchResultsFor(searchInput.value);
    } else {
        searchInput.focus();
    }
}
