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
