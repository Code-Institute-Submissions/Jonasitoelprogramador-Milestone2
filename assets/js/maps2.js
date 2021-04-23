let map;
let service;
let infowindow;
let ratingList = [];
let allResults = [];
let reliableRatings = [];
let reliableRatingsNumbers = [];
let reliableRatingsName = [];
let sortedDicts = [];
let cullList = [];

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
            lat: 43.2965,
            lng: 5.3698
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
    var arr3 = {};
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

    var sorted = sortable.sort(function (a, b) {
        return a[1] - b[1];
    });

    console.log(reliableRatings);
    console.log(sorted);

    for (var x = 0; x < sorted.length; x++) {
        for (var i = 0; i < reliableRatings.length; i++) {
            if (reliableRatings[i].name == sorted[x][0]) {
                sortedDicts.push(reliableRatings[i])
            }
        }
    }

    console.log(sortedDicts);

    numberFive = sortedDicts[sortedDicts.length - 5];
    for (var i = 0; i < sortedDicts.length; i++) {
        if (sortedDicts[i].rating == numberFive.rating) {
            cullList.push(sortedDicts[i]);
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

    fiveBest = sortedDicts.slice(Math.max(sortedDicts.length - 5, 1));
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
    /*var theList = stuntedList.push(cullList.slice(-counter));
    console.log(theList);*/
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