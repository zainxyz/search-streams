/**
 * The main search-streams app js file.
 */

/**
 * Build a single search-results item.
 *
 * @method buildSearchResultItem
 * @param  {Object}              item The item to build
 * @return {null}
 */
function buildSearchResultItem(item) {
    // Create a new list-item.
    const li = document.createElement('a');
    // Set a couple of attributes for this list-item.
    li.setAttribute('href', item.url);
    li.setAttribute('class', 'list-group-item list-group-item-action');
    li.setAttribute('target', '_blank');
    // NOTE: Instead of creating individual elements,
    // and appending them to the `li` one by one,
    // we can safely set the `innerHTML` for this sample project.
    //
    // NOTE: Creating individual elements and appending one by one
    // is faster than `innerHTML`.
    li.innerHTML = `
        <div class="row align-items-stretch">
            <div class="col-2">
                <img src="${item.previewImg}" alt="${item.displayName}" class="img-fluid" />
            </div>
            <div class="col-10">
                <h5 class="mb-1">${item.displayName}</h5>
                <div class="d-flex w-100 align-items-baseline justify-content-start">
                    <p class="mb-1">${item.gameName} -&nbsp;</p>
                    <small>${item.viewers} Viewers</small>
                </div>
                <p class="mb-0">
                    ${item.description}
                </p>
            </div>
        </div>
    `;
    // Append each `li` to the main `searchResultsList` list.
    document.getElementById('searchResultsList').appendChild(li);
}

/**
 * Clean out the previous search results.
 *
 * @method cleanSearchResults
 */
function cleanSearchResults() {
    // Fastest way to clean out the previous results,
    // is to set the `innerHTML` to an empty string.
    document.getElementById('searchResultsList').innerHTML = '';
}

function fetchResultsFor(query) {
    if (query && query !== oldSearchQuery) {
        searchStreams(query)
            .then(resp => {
                // Clean out the old UI.
                cleanSearchResults();
                // Build the UI.
                resp.streams.forEach(buildSearchResultItem);
                // Update the oldSearchQuery value.
                oldSearchQuery = query;
            })
            .catch(err => {
                console.log('err :', err);
            });
    }
}

function autorun() {
    console.log('autorun');

    const searchInput = document.getElementById('searchInput');
    const searchInputBtn = document.getElementById('searchInputBtn');

    searchInputBtn.addEventListener('click', handleOnSearchInputBtnClick);
    searchInput.addEventListener('keyup', handleOnSearchInputKeyup);
}

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', autorun, false);
} else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', autorun);
} else {
    window.onload = autorun;
}
