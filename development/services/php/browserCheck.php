<?php

function getBrowser() {
  $u_agent = $_SERVER['HTTP_USER_AGENT'];
  $bname = 'Unknown';
  $platform = 'Unknown';
  $version= "";

  // get the platform?
  if (preg_match('/linux/i', $u_agent)) {
    $platform = 'linux';
  } elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
    $platform = 'mac';
  } elseif (preg_match('/windows|win32/i', $u_agent)) {
    $platform = 'windows';
  }

  // get the name of the useragent
  if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)) {
    $bname = "MSIE";
  } elseif(preg_match('/Firefox/i',$u_agent)) {
    $bname = "Firefox";
  } elseif(preg_match('/Chrome/i',$u_agent)) {
    $bname = "Chrome";
  } elseif(preg_match('/Safari/i',$u_agent)) {
    $bname = "Safari";
  } elseif(preg_match('/Opera/i',$u_agent)) {
    $bname = "Opera";
  } elseif(preg_match('/Netscape/i',$u_agent)) {
    $bname = "Netscape";
  }

  // get the correct version number
  $known = array('Version', $bname, 'other');
  $pattern = '#(?<browser>' . join('|', $known) . ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
  if (!preg_match_all($pattern, $u_agent, $matches)) {
    // we have no matching number just continue
  }

  // see how many we have
  $i = count($matches['browser']);
  if ($i != 1) {
    //see if version is before or after the name
    if($bname == 'Safari') {
      $version = array();
      $version[0] = $matches['version'][0];
      $version[1] = $matches['version'][1];
    } else if (strripos($u_agent,"Version") < strripos($u_agent,$bname)){
      $version= $matches['version'][0];
    } else {
      $version= $matches['version'][1];
    }
  } else {
    $version= $matches['version'][0];
  }

  if (isset($u_agent) && ( (strpos($u_agent, 'MSIE') !== false ) || (strpos($u_agent, 'Trident/7.0; rv:11.0') !== false) ) ){
    $bname = "MSIE";
    $version = '11.0';
  }
  // check if we have a number
  if ($version==null || $version=="") {$version="?";}

  if($bname == 'Safari') {
    for($i = 0; $i < sizeof($version); $i++) {
      try {
        $versionSplit = explode('.', $version[$i]);
        $version[$i] = $versionSplit[0];
      } catch (Exception $e) {
        unset($e);
      }
    }
  } else {
    try {
      $versionSplit = explode('.', $version);
      $version = $versionSplit[0];
    } catch (Exception $e) {
      unset($e);
    }
  }


  return array(
    'name'      => $bname,
    'version'   => $version,
    'platform'  => $platform
  );
}

function compareBrowser() {
  $requiredBrowserVerions = array(
    'Chrome' => 81,
    'Safari' => array(13, 605),
    'Firefox' => 78,
    'Edge' => 18,
    'MSIE' => 'not supported'
  );

  $bool = NULL;

  $ua = getBrowser();

  if($requiredBrowserVerions[$ua['name']] === 'not supported') {
    $bool = FALSE;
  } else if($ua['name'] == 'Safari') {
    if($ua['version'][0] >= $requiredBrowserVerions['Safari'][0] && $ua['version'][1] >= $requiredBrowserVerions['Safari'][1]) {
      $bool = TRUE;
    } else {
      $bool = FALSE;
    }
  } else if(intval($ua['version']) >= $requiredBrowserVerions[$ua['name']]) {
    $bool = TRUE;
  } else {
    $bool = FALSE;
  }

  $browserInfo = array(
    'name' => $ua['name'],
    'userVersion' => $ua['version'],
    'reqVersion' => $requiredBrowserVerions[$ua['name']],
    'metRequirement' => $bool

  );

  return $browserInfo;
}

// write browser-data into $_SESSION variable
$_SESSION['BROWSERCHECK'] = compareBrowser();
