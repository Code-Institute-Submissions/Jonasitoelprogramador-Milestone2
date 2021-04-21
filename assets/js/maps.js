let map;
let service;
let infowindow;
let ratingList = [];
let allResults = [];

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
}

function callback(results, status, pagination) {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
            /*createMarker(results[i]);*/
            ratingList.push(results[i].rating)
            allResults.push(results[i]);
        }
    }
    /*console.log(results);
    console.log(ratingList);*/
    if (pagination.hasNextPage) {
        pagination.nextPage();
    } else {
        createObject(allResults, ratingList);
    }
}

function createObject(results, ratings) {
    console.log(results);
    console.log(ratings);
    var arr3 = {},
        arr2 = [2, 4, 6];
    arr1 = [2, 4, 6];
    for (var i = 0; i < arr1.length; i++) {
        arr3[arr1[i]] = arr2[i];
    }
    console.log(arr3)
}

function createMarker(input) {
    const marker = new google.maps.Marker({
        map,
        position: input.geometry.location,
    });
    google.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
            "<strong><div>" +
            input.rating + "</div></strong>" +
            input.name +
            "<br>" +
            input.formatted_address +
            "</div>"
        );
        infowindow.open(map, this);
    })
}