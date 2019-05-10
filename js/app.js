/**
 * The main search-streams app js file.
 */

/**
 * Toggle the loader component.
 *
 * @method toggleLoader
 * @param  {Boolean}     show Show or hide the loader?
 */
function toggleLoader(show) {
    const loader = document.getElementById('loader');
    // Toggle the loader.
    if (show) {
        loader.hasAttribute('hidden') && loader.removeAttribute('hidden');
    } else {
        !loader.hasAttribute('hidden') && loader.setAttribute('hidden', true);
    }
}

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

/**
 * Build the header for the search results (user message + pagination).
 *
 * @method buildHeader
 * @param  {Object}    res The API response
 */
function buildHeader(res) {
    const { query, total } = res;
    // Find couple of elements.
    const pagination = document.getElementById('pagination');
    const msgContainer = document.getElementById('msgContainer');
    // Based on the `total` value, we'll update the header.
    if (total) {
        // Find some elements.
        const maxPageCount = document.getElementById('maxPageCount');
        const currPageCount = document.getElementById('currPageCount');
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');
        const totalResults = document.getElementById('totalResults');
        // Reset the `totalResults` content based on the total results.
        totalResults.innerHTML = total;
        // Set the max page count.
        maxPageCount.innerHTML = GLOBALS.maxPageNumber;
        // Set the current page count.
        currPageCount.innerHTML = GLOBALS.currentPageNumber;
        // Disable the `prevPageBtn` if the current page number is 1.
        GLOBALS.currentPageNumber === 1
            ? prevPageBtn.setAttribute('disabled', true)
            : prevPageBtn.removeAttribute('disabled');
        // Disable the `nextPageBtn` if the current page number is the `maxPageCount`.
        GLOBALS.currentPageNumber === GLOBALS.maxPageNumber
            ? nextPageBtn.setAttribute('disabled', true)
            : nextPageBtn.removeAttribute('disabled');
        // Show the pagination.
        pagination.hasAttribute('hidden') && pagination.removeAttribute('hidden');
        // Hide the msg container.
        !msgContainer.hasAttribute('hidden') && msgContainer.setAttribute('hidden', true);
    } else {
        // Find some elements.
        const msg = document.getElementById('msg');
        // Update msg to let the user know we were unable to find results for their query.
        msg.innerHTML = `
            Sorry, but we were unable to find results for the <code>${query}</code> query.
            <br />
            Please try again.
        `;
        // Hide the pagination.
        !pagination.hasAttribute('hidden') && pagination.setAttribute('hidden', true);
        // Show the msg container.
        msgContainer.hasAttribute('hidden') && msgContainer.removeAttribute('hidden');
    }
}

/**
 * Fetch results and render the DOM for a given search query.
 *
 * @method fetchResultsFor
 * @param  {String}        query The search query
 */
function fetchResultsFor(query = GLOBALS.prevSearchQuery) {
    if (
        query &&
        (query !== GLOBALS.prevSearchQuery || GLOBALS.currentPageNumber <= GLOBALS.maxPageNumber)
    ) {
        // Show the loader.
        toggleLoader(true);
        // Search the streams.
        searchStreams(query)
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
                GLOBALS.prevSearchQuery = query;
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

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', bootstrap, false);
} else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', bootstrap);
} else {
    window.onload = bootstrap;
}
