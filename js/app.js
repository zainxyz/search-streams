/**
 * The main search-streams app js file.
 */

function autorun() {
  console.log("autorun");
}

if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", autorun, false);
} else if (document.attachEvent) {
  document.attachEvent("onreadystatechange", autorun);
} else {
  window.onload = autorun;
}
