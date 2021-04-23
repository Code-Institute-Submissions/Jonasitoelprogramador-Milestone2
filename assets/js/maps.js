let map;
let service;
let infowindow;
let ratingList = [];
let allResults = [];
let reliableRatings = [];
let cullList = [];

function initMap() {
    const lewes = new google.maps.LatLng(50.8739, 0.0088);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: lewes,
        zoom: 8,
    });
    const request = {
        query: "coffeeshop",
        location: {
            lat: 52.4862,
            lng: -1.8904
        },
        radius: 10000,
    };
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

function callback(results, status, pagination) {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
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

    reliableRatings.sort((a, b) => {
        if (a.rating > b.rating) {
            return 1
        } else {
            return -1
        }
    })
    console.log(reliableRatings);

    numberFive = reliableRatings[reliableRatings.length - 5];
    for (var i = 0; i < reliableRatings.length; i++) {
        if (reliableRatings[i].rating == numberFive.rating) {
            cullList.push(reliableRatings[i]);
        }
    };
    /*taken from https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/ */
    cullList.sort((a, b) => {
        if (a.user_ratings_total > b.user_ratings_total) {
            return 1
        } else {
            return -1
        }
    })
    console.log(cullList);

    /*need to work out how many of the top 5 have the same value as fifth value and add in the correct amount back into the topfive list*/

    fiveBest = reliableRatings.slice(Math.max(reliableRatings.length - 5, 1));
    console.log(fiveBest);
    var counter = 0;
    for (var i = 0; i < fiveBest.length; i++) {
        if (fiveBest[i].rating == numberFive.rating) {
            counter = counter + 1;
        };
    }
    console.log(counter);

    var stuntedList = fiveBest.slice(-(5 - counter));
    console.log(stuntedList);
    var theCullList = cullList.slice(-counter);
    console.log(theCullList);
    var theList = theCullList.concat(stuntedList);
    console.log(theList);
    for (var i = 0; i < theList.length; i++) {
        createMarker(theList[i]);
    }
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