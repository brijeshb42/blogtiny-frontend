import 'isomorphic-fetch';

// import { BASE_PATH } from 'constants/network';
const BASE_PATH = "//localhost:5000/api/1.0"

let cache = {};

const method = (url, method='get', options={}) => {
  let contentType = 'application/json;charset=UTF-8';
  if (options.form) {
    contentType = 'multipart/form-data';
  }
  if (options.form) {
    contentType = 'application/x-www-form-urlencoded';
  }
  const opt = {
    method: method,
    headers: {},
  };
  if (!options.form) {
    opt.headers['Content-Type'] = contentType;
  }
  if (options.data && method !== 'get') {
    opt.body = (options.form) ? options.data : JSON.stringify(options.data);
  }
  return fetch(BASE_PATH + url, opt);
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    error.status = response.status;
    throw error
  }
}

const sendFetch = (ftch, success, error, context=null, isGet=false, key='') => {
  // console.log(key);
  return ftch
      .then(checkStatus)
      .then((resp) => {
        if (resp.type) {
          if (resp.type === "success") {
            if (typeof success === 'function') {
              if (isGet && key !== '') {
                cache[key] = resp;
              }
              success.call(context, resp);
            }
          } else {
            const err = new Error(resp.result);
            error.response = resp;
            throw err;
          }
        }
      })
      .catch(err => {
        if (err.response) {
          err.response.json().then((data) => {
            if (typeof error === 'function') {
              error.call(context, {
                data,
                status: err.response.status
              });
            }
          }); 
        }
      });
};

const Fetch = {
  get: (path, options={}, success=null, error=null, context=null) => {
    let key = path;
    if (options.data) {
      key += '?';
      Object.keys(options.data).forEach((param) => {
        key += param + '=' + options.data[param] + '&'
      });
      key = key.slice(0, -1);
    }
    // if (cache.hasOwnProperty(key)) {
    //   if (typeof success === 'function') {
    //     success.call(context, cache[key]);
    //     return;
    //   }
    // }
    const ftch = method(key, 'get', options);
    sendFetch(ftch, success, error, context, true, key);
  },
  post: (path, options={}, success=null, error=null, context=null) => {
    const ftch = method(path, 'post', options);
    sendFetch(ftch, success, error, context);
  },
  del: (path, options={}, success=null, error=null, context=null) => {
    const ftch = method(path, 'delete', options);
    sendFetch(ftch, success, error, context);
  },
  put: (path, options={}, success=null, error=null, context=null) => {
    const ftch = method(path, 'put', options);
    sendFetch(ftch, success, error, context);
  },
  patch: (path, options={}, success=null, error=null, context=null) => {
    const ftch = method(path, 'patch', options);
    sendFetch(ftch, success, error, context);
  },
  clear: (key) => {
    if (typeof key === 'undefined' || !cache[key]) {
      cache = {};
    } else {
      Object.keys(cache).forEach((oldKey) => {
        if (oldKey.indexOf(key) == 0) {
          delete cache[oldKey];
        }
      });
    }
  }
};

window.Fetch = Fetch;

export default Fetch;
