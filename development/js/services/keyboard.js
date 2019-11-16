/**
 * KEYBOARD init
 */
const KEYBOARD = {};

/**
 * KEYBOARD.assignEvent assigns click events on keyup to the given elements
 * @param element can be single element or a collection of elements
 */
KEYBOARD.assignEvent = function (element) {
  $(element).keyup(function(e) {
    e.preventDefault();
    let key = e.which;
    // assignments for enter-key and space-bar
    if (key === 13 || key === 32)  {
      $(this).click();
      return false;
    }
  });
  console.log("MESSAGE: Keyboard functionality added.");
};

/**
 * KEYBOARD.assignTabIndex assigns tabIndexes to the given elements incrementing by 1 starting from 100
 * @param element can be single element or a collection of elements
 */
KEYBOARD.assignTabIndex = function (element) {
  let dataTab = element || document.querySelectorAll("[data-tab]");
  let tabIndexStartingRange = 100;

  $(dataTab).each(function(index) {
    $(this).attr("tabindex", tabIndexStartingRange + index);
  });
  console.log("MESSAGE: TabIndex for - " + dataTab.length + " - elements is set.");
};

