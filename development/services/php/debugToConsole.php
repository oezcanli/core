<?php
/**
 * debug to console - just outputs the given message to the browser console
 */
function debug_to_console($data) {
  $output = $data;
  global $debugLog;
  $debugLog .= '<script>console.debug("MESSAGE: '. $output . '");</script>';
}
