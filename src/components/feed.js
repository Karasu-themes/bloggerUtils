function getParams(params) {
  const _GET_TYPE = typeof params;
  let _data = '';

  if (_GET_TYPE !== "object") return "";

  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const value = params[key];
      _data += `${key}=${value}&`;
    }
  }

  return "?" + _data.slice(0, -1);
}

/**
 * 
 * @param {Object} data 
 * @returns HTMLelement
 */
export function feed(data) {

  const {
    homeURL,
    type,
    label,
    mod,
    params } = data;

  const script = document.createElement('script'),
    _DEFAULT_URL = '',
    _TYPE = type || "posts",
    _MOD = mod || "default",
    _LABEL = label ? `/${_MOD}/-/${label}` : `/${_MOD}`;

  script.src = (homeURL || _DEFAULT_URL) + "/feeds/" + _TYPE + _LABEL + getParams(params ?? {});

  return script;

}

export function feedPost( { blogId, postId, cbName } ) {
  const endpoint = `https://www.blogger.com/feeds/${blogId}/posts/default/${postId}?alt=json-in-script&callback=${cbName}`;
  const script = document.createElement('script');
  script.src = endpoint;
  return script;
}

export function feedPostsList( { blogId, cbName, label, maxResults = 8 } ) {
  const endpoint = `https://www.blogger.com/feeds/${blogId}/posts/default${label ? `/-/${label}` : ""}?alt=json-in-script&callback=${cbName}&max-results=${maxResults}`;
  const script = document.createElement('script');
  script.src = endpoint;
  return script;
}