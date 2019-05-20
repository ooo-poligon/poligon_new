<?php
		$localhost   = "localhost";
		$db          = "poligon_production";
		$RootUserName      = "poligon_user";
		$RootUserPassword  = "uEA9xDuTEANC";

    $result = new mysqli($localhost, $RootUserName, $RootUserPassword);

    // Check connection
    if ($result->connect_error) {
        die("Connection failed: " . $result->connect_error);
    } else {

      mysqli_select_db($result, $db);
      $result->set_charset("utf8");
    }
?>
