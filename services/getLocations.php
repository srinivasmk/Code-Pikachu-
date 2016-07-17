<?php
 
  include("config.php");
   
  $zipLatitude  = $_GET['latitude'];
  $zipLongitude = $_GET['longitude'];
  $radius       = $_GET['radius'];
   //6371
//3959
  $query = "SELECT id, latitude, longitude, 
    ( 6371 * acos( cos( radians($zipLatitude) ) * cos( radians( latitude ) ) * 
    cos( radians( longitude ) - radians($zipLongitude) ) + sin( radians($zipLatitude) ) * 
    sin( radians( latitude ) ) ) ) AS distance 
    FROM pokemon HAVING distance < $radius ORDER BY distance";
 
  $result = $db->query($query);
 
  $coordinates = array();
   
  while ($row = $result->fetch_object()) {
    $coordinates[] = array("latitude" => $row->latitude, "longitude" => $row->longitude);   
  }
   
  $coordinates = json_encode($coordinates);
 
  echo $coordinates;
 
?>