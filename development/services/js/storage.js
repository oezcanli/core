// STORAGE key functions to handle data of the localStorage
const STORAGE = {};

/**
  * STORAGE.get gets desired object + property from the localStorage and returns it
  * @param {string} objectName
  * @param {string} [prop]
  * @returns {*} – if no localStorageObject --> null
 **/
STORAGE.get = function(objectName, prop) {
  let localStorageObject;
  let localStorageData;

  localStorageObject = JSON.parse(localStorage.getItem(objectName));

  if (localStorageObject && typeof prop !== "undefined") {
    if (localStorageObject.hasOwnProperty(prop)) {
      localStorageData = localStorageObject[prop];
    } else {
      localStorageData = null;
    }
  } else {
    localStorageData = localStorageObject;
  }

  return localStorageData;
};

/**
  * STORAGE.set writes data to localStorage depending on the given parameters
  * @param {string} objectName
  * @param {string} prop
  * @param {*} value
 **/
STORAGE.set = function(objectName, prop, value) {
  const
    localStorageObject = JSON.parse(localStorage.getItem(objectName)) || {};
  
  if (typeof prop === "object" && !value) {
    for (let [key, value] of Object.entries(prop)) {
      STORAGE.set(objectName, key, value);
    }
  } else {
    localStorageObject[prop] = value;
    localStorage.setItem(objectName, JSON.stringify(localStorageObject));
  }
};

/**
  * STORAGE.remove removes specific data from localStorage depending on the given parameter
  * @param {string} objectName
 **/
STORAGE.remove = function(objectName) {
  localStorage.removeItem(objectName);
};

/**
  * STORAGE.clearlocalStorage clears all data in the localStorage
 **/
STORAGE.clear = function() {
  localStorage.clear();
};
