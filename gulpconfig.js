module.exports = {
  dir: {
    dev: "development/",
    deploy: "deployment/",
    js: "development/js/**"
  },
  files: {
    js: [
      // main
      "development/js/main.js",
      // services
      "development/js/services/version.js",
      "development/js/services/http.js",
      "development/js/services/animations.js",
      "development/js/services/storage.js",
      "development/js/services/keyboard.js"
    ]
  }
};
