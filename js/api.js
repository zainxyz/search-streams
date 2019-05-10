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
 * @param  {Number}      [offset=0] The offset (if any)
 * @return {Object}
 */
async function searchStreams(query = '', offset = 0) {
    try {
        // Fetch the stream results.
        const resp = await makeRequest({
            method: 'GET',
            url: CLIENT_URL,
            headers: {
                'Client-Id': CLIENT_ID
            },
            params: {
                limit: 5,
                offset,
                query
            }
        });
        console.log('searchStreams : resp :', resp);
        // Return a clean obj.
        return {
            streams: normalizeStreams(resp.streams || []),
            total: resp._total
        };
    } catch (e) {
        console.log('e :', e);
        return e;
    }
}
