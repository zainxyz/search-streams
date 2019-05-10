/**
 * The Twitch.tv client-id.
 * FIXME: Remove this from the core-code and place it higher up in an .env file.
 *
 * @type {String}
 */
const CLIENT_ID = 'wnys7hbeeg9wrgvczr8kjnvcfkj86k';

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

makeRequest({
    method: 'GET',
    url: 'https://api.twitch.tv/kraken/search/streams',
    headers: {
        'Client-Id': CLIENT_ID
    },
    params: {
        query: 'diablo',
        limit: 5
    }
})
    .then(resp => {
        console.log('resp :', resp);
    })
    .catch(err => {
        console.log('err :', err);
    });
