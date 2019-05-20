<?php

/*
* Вывод заголовока html
*/
function PrintHeader($title = "C", $description = null, $keywords = null)
  {
  ?>
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
  <?php
  }
/*
* Вывод подвала html
*/
function PrintBottom()
  {
  ?>
    <div class="footer l-box is-center">
        Copyright Poligon 2018
    </div>
</div> 
  
  </body>
</html>
  <?php
  }

function MySQLConnect()
  {
    $localhost   = "176.53.160.235";
    $db          = "poligon_production";
    #$RootUserName      = "poligon_user";
    #$RootUserPassword  = "uEA9xDuTEANC";
    $RootUserName      = "vladlaptev2";
    $RootUserPassword  = "Passqq";
    $result = new mysqli($localhost, $RootUserName, $RootUserPassword);

    // Check connection
    if ($result->connect_error) {
        die("Connection failed: " . $result->connect_error);
    } else {

      mysqli_select_db($result, $db);
      $result->set_charset("utf8");
    }
  
    return $result;
  }

function MySQLClose($MySQLDB)
  {
    return @mysqli_close($MySQLDB);
  }
  
function ExecQuery($sQuery, $MySQLDB = 0)
  {
    $result = false;
    $$MySQLDB = MySQLConnect();
    $result = $$MySQLDB->query($sQuery);
    return $result;
  }

function GetOneRecord($sQuery, $MySQLDB = 0)
  {
    $record = array();
    $$MySQLDB = MySQLConnect();
    $result = $$MySQLDB->query($sQuery);
    $record = mysqli_fetch_array($result, MYSQLI_BOTH);
    return $record;
  }

function GetRecords($sQuery, $MySQLDB = 0)
  {
    $record = array();
    $$MySQLDB = MySQLConnect();
    $result = $$MySQLDB->query($sQuery);
    while ($row = mysqli_fetch_array($result, MYSQLI_BOTH))
      array_push($record, $row);
    return $record;
  }
  
function GetArrayRecords($sQuery, $MySQLDB = 0)
  {
    $record = array();
    $$MySQLDB = MySQLConnect();
    $result = $$MySQLDB->query($sQuery);
    $record = mysqli_fetch_array($result, MYSQLI_BOTH);
    return $record;
  }

?>

