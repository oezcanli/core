class BrowserCheck {

  constructor() {
    this.minRequired = {
      Chrome: 81,
      Safari: {
        Safari: 605,
        Version: 13
      },
      Firefox: 78,
      Edge: 18,
    };
    this.browserInfo = null;
  }
  getClient() {

    let browser = "";
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
      browser = 'Opera';
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1) {
      browser = 'Chrome';
      // old Egde(no chromium)
      if (navigator.userAgent.indexOf("Edge") != -1) {
        browser = 'Edge';
      }
    }
    else if (navigator.userAgent.indexOf("Safari") != -1) {
      browser = ["Version", "Safari"];
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
      browser = 'Firefox';
    }
    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
      browser = 'IE';
    }
    else {
      browser = 'unknown' | null;
    }
    return browser;
  }

  getClientVersion(browser) {
    if (Array.isArray(browser)) {
      if (navigator.userAgent.indexOf(browser[0]) != -1) {
        return [parseInt(window.navigator.userAgent.substr(navigator.userAgent.indexOf(browser[0])).split("/")[1].split(" ")[0]),
          parseInt(window.navigator.userAgent.substr(navigator.userAgent.indexOf(browser[1])).split("/")[1].split(" ")[0])]
      } else {
        return [0, parseInt(window.navigator.userAgent.substr(navigator.userAgent.indexOf(browser[1])).split("/")[1].split(" ")[0])]
      }
    }
    return parseInt(window.navigator.userAgent.substr(navigator.userAgent.indexOf(browser)).split("/")[1].split(" ")[0]);
  }

  isClientCompatible(minRequired) {
    if (this.getClient()) {
      if (Array.isArray(this.getClientVersion(this.getClient()))) {
        return this.getClientVersion(this.getClient())[1] >= minRequired[this.getClient()[1]].Safari || this.getClientVersion(this.getClient())[0] >= minRequired[this.getClient()[1]].Version;
      } else {
        this.browserInfo = this.getClient() + ": " + this.getClientVersion(this.getClient()) + " / min required: " + minRequired[this.getClient()];
        return this.getClientVersion(this.getClient()) >= minRequired[this.getClient()];
      }
    }

    return false;
  }

  detectDevice() {
    const md = new MobileDetect(window.navigator.userAgent);
    console.debug("Device: ", md.mobile() ? md.phone() ? "phone" : md.tablet() ? "tablet" : false : "desktop");
    return md.mobile() ? md.phone() ? "phone" : md.tablet() ? "tablet" : false : "desktop";
  }

  // execute to start checking the browser
  handleError() {

    if(this.isClientCompatible(this.minRequired)) {
      console.debug("BROWSER INFO:", this.browserInfo);
      // DO IF COMPATIBLE

    } else if (!this.isClientCompatible(this.minRequired)) {
      console.error("BROWSER NOT COMPATIBLE:", this.browserInfo);
      // DO IF NOT COMPATIBLE

    }
  }
}
