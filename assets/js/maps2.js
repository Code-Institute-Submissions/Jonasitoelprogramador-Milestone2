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
        query: "tennis",
        location: {
            lat: 51.5074,
            lng: 0.1278
        },
        radius: 10000,
        /*bounds: LatLngBounds([
            new google.maps.LatLng(36.51543, -4.88583),
            new google.maps.LatLng(42.69764, 2.89541)
        ]),*/
    };
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                details(results[i]);
            }
        }
        /*if (results.hasNextPage == True) {
            results.nextPage()
        } else {
            map.center = (36.51543, -4.88583)
        }*/
    }
};


function details(searchResult) {
    var quest = {
        placeId: searchResult.place_id,
        fields: ["rating"],
    };
    console.log(searchResult.rating);
    service.getDetails(quest, callback2);
}

function callback2(target, status) {
    console.log(target)
}











/*if (
    status === google.maps.places.PlacesServiceStatus.OK &&
    place &&
    place.geometry &&
    place.geometry.location)*/