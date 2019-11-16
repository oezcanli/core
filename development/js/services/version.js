/**
 * VERSION sets version number in element
 * @param element can be single element or a collection of elements
 */
const VERSION = function(element) {
  $(element).each(function(index) {
    $(this).innerHTML = APP.version;
  });
  console.log("VERSION:", APP.version);
};
