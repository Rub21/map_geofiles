/*var map = L.map('map', {
	attributionControl: false
}).setView([49, 3], 4);

L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18
}).addTo(map);*/
var map = L.mapbox.map('map', 'ruben.map-tlseskm0').setView([26.02663, -35], 2);
var url_geo = 'http://127.0.0.1:8000/media/files/';
var url = document.URL;
var id = url.substring(url.indexOf("#") + 1);

if (url.indexOf('#') !== -1) {
	url_geo = url_geo + id + '.js'
	mapdata(url_geo);
}



$(document).on('ready', function() {


	var filename = $('input[type=file]').val();
	$('#up_files').find('li').each(function(j, li) {
		var arr = $(li).attr('id').split('/');
		arr = arr[1].split('.')
		console.log(arr[0]);
		arr = arr[0];

		$(li).find('a').each(function() {

			$(this).attr("href", "http://127.0.0.1:8000/mapfiles#" + arr)
		});
	});



});

function mapdata(url_data) {

	$.getJSON(url_data, {
		format: "json"
	}).done(function(data) {
		console.log('don data');
		console.log(data);

		

		map.markerLayer.on('layeradd', function(e) {
			var marker = e.layer,
				feature = marker.feature;
			//marker.setIcon(myIcon);
			var popupContent = "<h2>Propiedades</h2>";
			marker.bindPopup(popupContent, {
				closeButton: false,
				minWidth: 200
			});
		});

		//map.markerLayer.setGeoJSON(data);
		L.mapbox.markerLayer(data).addTo(map);
		//var markerLayer = L.mapbox.markerLayer(data).addTo(map);
		//L.geoJson(data).addTo(map);

	});

}