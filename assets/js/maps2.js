let map;
let service;
let infowindow;
let ratingList = [];
let allResults = [];
let reliableRatings = [];
let reliableRatingsNumbers = [];
let reliableRatingsName = [];
let theList = [];

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
            lat: -22.908333,
            lng: -43.196388
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
            allResults.push(results[i]);
        }
    }
    if (pagination.hasNextPage) {
        pagination.nextPage();
    } else {
        createObject(allResults);
    }
}

function createObject(results) {
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        results[i].user_ratings_total;
        if (results[i].user_ratings_total >= 15) {
            reliableRatings.push(results[i])
        }
    }
    for (let i = 0; i < reliableRatings.length; i++) {
        reliableRatingsNumbers.push(reliableRatings[i].rating);
    }
    for (let i = 0; i < reliableRatings.length; i++) {
        reliableRatingsName.push(reliableRatings[i].name);
    }
    console.log(reliableRatingsName);
    console.log(reliableRatingsNumbers);
    /*The below is taken from stack overflow*/
    var arr3 = {}
    var arr2 = reliableRatingsNumbers;
    var arr1 = reliableRatingsName;
    for (var i = 0; i < arr1.length; i++) {
        arr3[arr1[i]] = arr2[i];
    }
    console.log(arr3)
    var arr3;
    var sortable = [];
    for (var rating in arr3) {
        sortable.push([rating, arr3[rating]]);
    }

    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });
    console.log(sortable);

    fiveBest = sortable.slice(Math.max(sortable.length - 5, 1));
    console.log(reliableRatings);
    console.log(fiveBest);
    for (var x = 0; x < fiveBest.length; x++) {
        for (var i = 0; i < reliableRatings.length; i++) {
            if (reliableRatings[i].name == fiveBest[x][0]) {
                createMarker(reliableRatings[i]);
            }
        }
    }
    console.log(theList);
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