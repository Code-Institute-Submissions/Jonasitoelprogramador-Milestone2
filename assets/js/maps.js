let map;
let service;
let infowindow;
let ratingList = [];
let allResults = [];
let reliablePlaces = [];
let sameRatingList = [];

/*Function called when map initializes.  Centers map, builds Google's PLacesServices object and applies textSearch method to it.*/
function initMap() {
    const lewes = new google.maps.LatLng(50.8739, 0.0088);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: lewes,
        zoom: 8,
    });
}

/*Taken from stack overflow https://stackoverflow.com/questions/5384712/intercept-a-form-submit-in-javascript-and-prevent-normal-submission*/
window.addEventListener("load", takeCityInput);

function takeCityInput() {
    document.getElementById('my-form').addEventListener("submit", function (e) {
        e.preventDefault();

        output = document.getElementById('my-form').elements['city'].value;
        console.log("hi");
        nameToCoord(output);
    })
};

function nameToCoord(output) {
    /*this is taken from code institue*/
    function getData(cb) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", `https://api.opencagedata.com/geocode/v1/json?q=(${output}&key=9b798510a3344259b8f4f319f7935472`);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonData = JSON.parse(this.responseText);
                cb((jsonData.results[0].geometry));
                console.log(jsonData.results[0].geometry);
            }
        };
    }

    function createTextSearchRequest(data) {
        const request = {
            query: "tennis",
            location: data,
            radius: 10000,
        };
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }
    getData(createTextSearchRequest);

}

/*Paginates through all textSearch results to get all 60 results and adds these to a list "allResults". Then calls createReliablePlaces function with allResults as an argument.*/
function callback(results, status, pagination) {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
            allResults.push(results[i]);
        }
    }
    if (pagination.hasNextPage) {
        pagination.nextPage();
    } else {
        createReliablePlaces(allResults);
    }
}
/*Filters out any of the search results with fewer than 15 reviews then sorts these by their "rating" property*/
function createReliablePlaces(results) {
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        results[i].user_ratings_total;
        if (results[i].user_ratings_total >= 15) {
            reliablePlaces.push(results[i])
        }
    }

    reliablePlaces.sort((a, b) => {
        if (a.rating > b.rating) {
            return 1
        } else {
            return -1
        }
    })
    console.log(reliablePlaces);
    createSameRatingList(reliablePlaces);
}

/*Finds all of the results that have the same rating property value as the result with the fifth best rating value.  
A list is then created with all of these results.  This list is then sorted using the user_ratings_total property. 
The next piece of code counts how many of the "fiveBest" array/list elements (the 5 elements from the reliablePlaces 
array with the highest rating) have the same rating as the element with the fifth higest rating value. This is 
counted using the counter variable.*/
function createSameRatingList(reliablePlaces) {
    numberFive = reliablePlaces[reliablePlaces.length - 5];
    for (var i = 0; i < reliablePlaces.length; i++) {
        if (reliablePlaces[i].rating == numberFive.rating) {
            sameRatingList.push(reliablePlaces[i]);
        }
    };
    /*taken from https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/ */
    sameRatingList.sort((a, b) => {
        if (a.user_ratings_total > b.user_ratings_total) {
            return 1
        } else {
            return -1
        }
    })
    fiveBest = reliablePlaces.slice(Math.max(reliablePlaces.length - 5, 1));
    console.log(fiveBest);
    var counter = 0;
    for (var i = 0; i < fiveBest.length; i++) {
        if (fiveBest[i].rating == numberFive.rating) {
            counter = counter + 1;
        };
    }
    createFinalList(sameRatingList, fiveBest, counter);
}

/*The counter variable is used to manipulate the final list that is passed to the createMarker function
 in order that if several places have the same rating, the ones that are included in the final list are 
 prioritized by the number of reviews that they have.*/
function createFinalList(sameRatingList, fiveBest, counter) {
    var temporaryList = fiveBest.slice(-(5 - counter));
    console.log(temporaryList);
    var mostReviewsList = sameRatingList.slice(-counter);
    console.log(mostReviewsList);
    var theList = mostReviewsList.concat(temporaryList);
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