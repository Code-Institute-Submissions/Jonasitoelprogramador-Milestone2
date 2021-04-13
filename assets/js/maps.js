let map;

function initMap() {
    var center = new google.maps.LatLng(37.422, -122.084058)
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