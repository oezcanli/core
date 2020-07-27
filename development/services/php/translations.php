<?php
// init empty translations array
$translations = array();

// check if JSON file exists and load contents into $translations
if (file_exists($_SERVER["DOCUMENT_ROOT"].'/resources/translation/'. $_SESSION['language'] .'.json')) {
  $translations = json_decode(
    file_get_contents($_SERVER["DOCUMENT_ROOT"].'/resources/translation/'. $_SESSION['language'] .'.json'), true
  );
}

// assign content of $translations to any other variable, e.g. $_SESSION['translations']
$_SESSION['translations'] = $translations;

// require debugToConsole service
require_once($_SERVER["DOCUMENT_ROOT"].'/services/debugToConsole.php');
// check if translations loaded and debug_to_console
if(!empty($translations)) {
  debug_to_console("Translations Loaded.");
} else {
  debug_to_console("Loading Translations failed!");
}
