let map;

function initMap() {
    var center = new google.maps.LatLng(20.422, -100.084058)
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 8,
    });

    var request = {
        location = center,
        radius = 8047,
        types = ['cafe']
    };

    var service = new google.maps.PlacesService(map);

    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
}