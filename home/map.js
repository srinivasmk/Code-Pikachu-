var currentLocation = null,map;
var marker_icons = {
	pokemon : "http://res.cloudinary.com/posterfox/image/upload/c_scale,h_50,q_100,w_50/v1468775200/Pokemon/MainMenu.png",
	gym : "http://res.cloudinary.com/posterfox/image/upload/q_100/v1468775209/Pokemon/Gym.png",
	pokestop : "http://res.cloudinary.com/posterfox/image/upload/q_100/v1468775221/Pokemon/Pokestop.png"
} 
function initMap() {
	var mapStyle = [{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#AFFFA0"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#EAFFE5"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#59A499"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#F0FF8D"},{"weight":2.2}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#1A87D6"}]}];
	map = new google.maps.Map(document.getElementById('map'), {
// 		center: {lat: -34.397, lng: 150.644},
		zoom: 6,
// 					styles:mapStyle
	});


	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			currentLocation = pos;

			nearbyPokemon();
			handleGetLocation();
			var marker = new google.maps.Marker({
				position: pos,
				map: map,
			});
			
			
// 			var coordInfoWindow = new google.maps.InfoWindow();
//         coordInfoWindow.setContent(createInfoWindowContent(pos, map.getZoom()));
//         coordInfoWindow.setPosition(pos);
//         coordInfoWindow.open(map);


			map.setCenter(pos);
			map.setZoom(15);
		}, function() {
			handleLocationError(true, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, pos) {
//         infoWindow.setPosition(pos);
//         infoWindow.setContent(browserHasGeolocation ?
//                               'Error: The Geolocation service failed.' :
//                               'Error: Your browser doesn\'t support geolocation.');
}
function getCurrentLocation()
	{
		if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
	
            return pos;
          });
		}
		return null;
	}
function nearbyPokemon()
{
	getSearchResult();
}
function getSearchResult(keyword,lat,lon,radius)
{
	url = "/services/getLocations.php";
	radius = !radius ? 10 : radius;
	if(!lat || !lon)
	{
		currentPos = currentLocation;
	}
	if(currentPos)
		{
			var paramsMap = {
				keyword : keyword,
				latitude : '12.0878400' || currentPos.lat ,
				longitude: '75.2784700' ||  currentPos.lng,
				radius : radius
			};
			sendRequest(url,"GET",paramsMap)
		}
	
}
var TILE_SIZE = 256;

function createInfoWindowContent(latLng, zoom) {
	var scale = 1 << zoom;

	var worldCoordinate = project(latLng);

	var pixelCoordinate = new google.maps.Point(
			Math.floor(worldCoordinate.x * scale),
			Math.floor(worldCoordinate.y * scale));

	var tileCoordinate = new google.maps.Point(
			Math.floor(worldCoordinate.x * scale / TILE_SIZE),
			Math.floor(worldCoordinate.y * scale / TILE_SIZE));

	return [
		"You are here"
	].join('<br>');
}

// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(latLng) {
	var siny = Math.sin(latLng.lat * Math.PI / 180);

	// Truncating to 0.9999 effectively limits latitude to 89.189. This is
	// about a third of a tile past the edge of the world tile.
	siny = Math.min(Math.max(siny, -0.9999), 0.9999);

	return new google.maps.Point(
			TILE_SIZE * (0.5 + latLng.lng / 360),
			TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}
function handleGetLocation(response)
{
	var response = [{"latitude":"13.0878400","longitude":"80.2784700","category":"PIKACHU","updated":"2016-07-17 18:09:49"}];
	if(response && response.length >0)
		{
			response.forEach(function(arr,index){
				var node = arr;
				if(node)
					{
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(node.latitude,node.longitude),
							icon: getMarkerIcon(node.category),
							map: map
          	});
						
						marker.addListener('click', function() {
							map.setZoom(8);
							map.setCenter(marker.getPosition());
						});
					}
			})
		}
}
function getCircle(magnitude) {
  var circle = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: .2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: 'white',
    strokeWeight: .5
  };
  return circle;
}
function getMarkerIcon(category)
{
	switch(category)
		{
			case "gym":
				return marker_icons.gym;
			case "pokestop":
				return marker_icons.pokestop;
			default:
				return marker_icons.pokemon;
		}
}
function sendRequest(url,method,paramsMap,callback)
{
	$.ajax({
		url:url,
		method:method,
		data:paramsMap,
		success:function(response)
		{
				switch(callback)
					{
						case "handleGetLocation":
							handleGetLocation(response);
							break;
					}
		}
		});
}

$(document).ready(function(){
	$("#location-input").keyup(function(e){
		var keyCode = e.keyCode;
		if(keyCode==13)
			{
				getSearchResult(	$("#location-input").val())
			}
	});
});