<!DOCTYPE html>
<html>
  <head>
    <title>Pikachu Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <div id="capture"></div>
    <script src="map.js">
      
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEWug_vSOsFPF4_zbgwzb12Twgq902rZg&callback=initMap"
    async defer></script>
  </body>
</html>