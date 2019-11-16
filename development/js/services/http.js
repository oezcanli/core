/**
 * HTTP init
 * @type {{url: string}, {}}
 */
const HTTP = {
  url: "http://*" // API endPoint url
};

/**
 * HTTP.post
 * @param {Object} data
 * @returns {Promise}
 */
HTTP.post = function(data) {
  let that = this,
    formData = new FormData();

  if (data instanceof FormData) {
    formData = data;
  } else {
    for (let k in data) {
      formData.append(k, data[k]);
    }
  }

  return new Promise(function(resolve, reject) {
    fetch( that.url, {
      method: "POST",
      // mode: "no-cors",
      cache: "no-cache",
      body:  formData
    })
      .then(res => {
        if (res.json) {
          res.json()
            .then(json => {

              resolve(json);
            })
            .catch(jsonErr => console.error("url:", that.url, "\ndata:", data, "\njsonErr:", jsonErr, "\nres:", res));
        } else {

          resolve(res);
        }
      })
      .catch(function(err) {
        if (err.json) {
          err.json()
            .then(json => {

              reject(json);
            })
            .catch(jsonErr => console.error("url:", that.url, "\ndata:", data, "\njsonErr:", jsonErr, "\nerr:", err));
        } else {

          reject(err);
        }
      });
  });
};
