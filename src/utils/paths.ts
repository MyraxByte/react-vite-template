export function isAbsoluteURL(url: string) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

export function combineURLs(baseURL: string, relativeURL: string) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

export function buildPath(baseURL: string, requestedURL: string) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
}
