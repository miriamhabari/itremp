/*

$(document).ready(function() {    
  initialize();
  // execute the slideShow, set 4 seconds (4000) for each image
  addARoute();

});

function addARoute() {
	console.log("called function")
}

  var directionDisplay;
  var directionsService = new google.maps.DirectionsService();
  function initialize() {
    var latlng = new google.maps.LatLng(51.764696,5.526042);

    directionsDisplay = new google.maps.DirectionsRenderer();
    var myOptions = {
      zoom: 14,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
    directionsDisplay.setMap(map);
    //directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    var marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"My location"
    }); 
  }
  function calcRoute() {
    var start = document.getElementById("routeStart").value;
    var end = "51.764696,5.526042";
    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }

  */
  var directionsDisplay;
  var directionsService;
  var startPoint;
  var endPoint;

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    
    directionsService = new google.maps.DirectionsService()
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    var startinput = document.getElementById('startInput');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(startinput);

    var autocompletestart = new google.maps.places.Autocomplete(startinput);
    autocompletestart.bindTo('bounds', map);
    var endinput = document.getElementById('destInput');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(endinput);

    var autocompleteend = new google.maps.places.Autocomplete(endinput);
    autocompleteend.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocompletestart.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocompletestart.getPlace();
        startPoint = place;
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
  
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    
        var address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
      
        //Location details
        for (var i = 0; i < place.address_components.length; i++) {
            if(place.address_components[i].types[0] == 'postal_code1'){
                document.getElementById('postal_code1').innerHTML = place.address_components[i].long_name;
            }
            if(place.address_components[i].types[0] == 'country1'){
                document.getElementById('country1').innerHTML = place.address_components[i].long_name;
            }
        }
        document.getElementById('location1').innerHTML = place.formatted_address;
        document.getElementById('lat1').innerHTML = place.geometry.location.lat();
        document.getElementById('lon1').innerHTML = place.geometry.location.lng();
    });
    autocompleteend.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocompleteend.getPlace();
        endPoint = place;
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
  
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    
        var address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
      
        //Location details
        for (var i = 0; i < place.address_components.length; i++) {
            if(place.address_components[i].types[0] == 'postal_code2'){
                document.getElementById('postal_code2').innerHTML = place.address_components[i].long_name;
            }
            if(place.address_components[i].types[0] == 'country2'){
                document.getElementById('country2').innerHTML = place.address_components[i].long_name;
            }
        }
        document.getElementById('location2').innerHTML = place.formatted_address;
        document.getElementById('lat2').innerHTML = place.geometry.location.lat();
        document.getElementById('lon2').innerHTML = place.geometry.location.lng();
    });
}

	function calcRoute() {
    //var start = document.getElementById("routeStart").value;
    //var end = "51.764696,5.526042";
    console.log("start",startPoint);
    console.log("end",endPoint);
    console.log("???",endPoint.geometry.location.lat())
    //return;
    var startPointlat = startPoint.geometry.location.lat() + "," + startPoint.geometry.location.lng();
    var endPointlat = endPoint.geometry.location.lat() + "," + endPoint.geometry.location.lng();
    var request = {
      origin:startPointlat,
      destination:endPointlat,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }