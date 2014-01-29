/*var hash = $(location).attr('hash');
console.log(hash)*/
var data_points;
var map = L.mapbox.map('map', 'ruben.map-tlseskm0').setView([26.02663, -35], 2);
var url_geo = 'http://127.0.0.1:8000/media/files/';
var url = document.URL;
var id = url.substring(url.indexOf("#") + 1);

var arr = '';

if (url.indexOf('#') !== -1) {
	arr = id;
	url_geo = url_geo + id + '.js'

	mapdata(url_geo);

} else {
	var name_file = $('#name_file').text();
	//console.log(name_file);
	window.location.href = $(location).attr('href') + '#' + name_file;
	arr = name_file;
	url_geo = url_geo + name_file + '.js';
	mapdata(url_geo);
}

$(document).on('ready', function() {

	$('#share').click(function() {
		$('#myModal').modal({
			show: true
		});

		var url_share = "http://127.0.0.1:8000/mapfiles#" + arr;

		$('#text_share').val('<iframe frameborder="0" width="100%" height="300" src="' + url_share + '"></iframe>"');



	});


});

function mapdata(url_data) {

	$.getJSON(url_data, {
		format: "json"
	}).done(function(data) {
		data_points = data;
		//console.log(data)
		map.markerLayer.on('layeradd', function(e) {
			var marker = e.layer,
				feature = marker.feature;
			//console.log(feature);
			//debugger;

			//marker.setIcon(myIcon);

			//marker.feature.properties[field_id]

			var popupContent = "";
			$.each(marker.feature.properties, function(key, value) {
				//console.log(key);
				//console.log(value);

				//if (marker.feature.properties.hasOwnProperty(value)) {
				var propValue = marker.feature.properties[value];
				popupContent = popupContent + "<p>" + key + " : " + value + "</p>"
				//}

			});



			//var popupContent = "<h2>Propiedades</h2>";

			marker.bindPopup(popupContent, {
				closeButton: false,
				minWidth: 200
			});
		});


		map.markerLayer.setGeoJSON(data);

		showdataitems(data);
		//L.mapbox.markerLayer(data).addTo(map);
		//var markerLayer = L.mapbox.markerLayer(data).addTo(map);
		//L.geoJson(data).addTo(map);



	});

};

function showdataitems(data) {
	//console.log(data.features.length);
	for (var i = 0; i < data.features.length; i++) {
		var field_id = data.features[i]['field_id'];
		/*for (var propName in data.features[i].properties) {



				if (data.features[i].properties.hasOwnProperty(propName)) {
					var propValue = data.features[i].properties[propName];
					console.log(propValue)

				}
			}

*/
		//var num = data.features[i].properties.length;

		/*var id_point = '';
			var name_point = '';

			//	console.log(num)
			$.each(data.features[i].properties, function(key, value) {


				if (data.features[i].properties.hasOwnProperty(value)) {
					var propValue = data.features[i].properties[value];

					id_point = propValue
				}

			});*/

		$("#data_items").append('<li><a class="items_data" href="#" id="' + data.features[i].properties[field_id].replace(/\s/g, "") + '">' + data.features[i].properties[field_id] + '</a></li>');
	};


	$('.items_data').click(function(e) {
		var id = this.id;
		var coordinates = [];
		coordinates = buscar_data(data_points, field_id, id).geometry.coordinates;
		map.setView([coordinates[1], coordinates[0]]);
		map.markerLayer.eachLayer(function(marker) {
			//console.log(marker.feature.properties[field_id].replace(/\s/g, ""));
			if (marker.feature.properties[field_id].replace(/\s/g, "") === id) {
				marker.openPopup();
			}
		});
	});
};


function buscar_data(list, field_id, id) {
	var point;
	$.each(list.features, function(value, key) {
		if (key.properties[field_id].replace(/\s/g, "") == id) {
			point = key;
		}
	});
	return point;
};