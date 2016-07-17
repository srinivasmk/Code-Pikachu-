<!DOCTYPE html>
<html>
  <head>
    <title>Pikachu Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
		<script src="jquery-3.1.0.min.js"></script>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        height: 100%;
      }
			#form-div
			{
				position: absolute;
				top:0px;
				margin-top: 10px;
				left: 100px;
			}
			.controls
			{
				border: 1px solid transparent;
				border-radius: 2px 0 0 2px;
				box-sizing: border-box;
				-moz-box-sizing: border-box;
				height: 32px;
				outline: none;
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
			}
			#location-input,#pokemon
			{
				background-color: #fff;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        margin-left: 12px;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 300px;
			}
			#location-input:focus,	#pokemon:focus {
        border-color: #4d90fe;
      }
			.controls-div
			{
				display:inline-block;
				margin-right:20px;
			}
      .pac-container {
        font-family: Roboto;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <div id="capture"></div>
		<div id="form-div">
			<div id="search-input" class="controls-div">
				<input id="location-input" class="controls" placeholder="Search by pokemon"/>
			</div>
<!-- 			<div id="pokemon-div" class="controls-div">
				
				<input id="pokemon" class="controls"/>
			</div> -->
		</div>
    <script src="map.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEWug_vSOsFPF4_zbgwzb12Twgq902rZg&callback=initMap"
    async defer></script>
  </body>
</html>