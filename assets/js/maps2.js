let map;
let service;
let infowindow;

function initMap() {
    const lewes = new google.maps.LatLng(50.8739, 0.0088);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: lewes,
        zoom: 8,
    });
    const request = {
        query: "padel",
        location: {
            lat: 43.60426,
            lng: 1.44367
        },
        radius: 100000,
        /*bounds: LatLngBounds([
            new google.maps.LatLng(36.51543, -4.88583),
            new google.maps.LatLng(42.69764, 2.89541)
        ]),*/
    };
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                details(results[i]);
            }
        }
    });
}

function details(place) {
    var quest = {
        placeId: place.place_id,
        fields: ["name", "formatted_address", "place_id", "geometry"],
    };
    service.getDetails(quest, (place, status) => {
        if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
        ) {
            const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
            });
            google.maps.event.addListener(marker, "click", function () {
                infowindow.setContent(
                    "<div><strong>" +
                    place.name +
                    "</strong><br>" +
                    "<br>" +
                    place.formatted_address +
                    "</div>"
                );
                infowindow.open(map, this);
            });
        }
    });
}








function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}