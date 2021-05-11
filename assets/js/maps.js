let map;
let service;
let infowindow;
let allResults = [];
let displayResults = [];
let string = "";


/*Function called when map initializes.  Centers map, builds Google's PLacesServices object and applies textSearch method to it.*/
function initMap() {
    const world = new google.maps.LatLng(0.1768696, 37.9083264);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: world,
        zoom: 2,
    });
}

/*Taken from stack overflow https://stackoverflow.com/questions/5384712/intercept-a-form-submit-in-javascript-and-prevent-normal-submission*/
window.addEventListener("load", takeCityInput);

function takeCityInput() {
    document.getElementById('my-form').addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementById('scroll').className = "";
        /*document.getElementById('error_messages').innerHTML = "";*/
        string = "";
        document.getElementById('results').innerHTML = "";
        document.getElementById("loader").className = "col-sm-6 col-lg-3 final-column-format loading-screen";
        document.getElementById("circle").className = "lds-circle";
        cityIntput = document.getElementById('my-form').elements['city'].value;
        typeOfPlaceInput = document.getElementById('my-form').elements['type_of_place'].value;
        nameToCoord(cityIntput, typeOfPlaceInput);
    })
};

function nameToCoord(cityIntput, typeOfPlaceInput) {
    /*this is taken from code institue*/
    function getData(cb) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", `https://api.opencagedata.com/geocode/v1/json?q=(${cityIntput}&key=9b798510a3344259b8f4f319f7935472`);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonData = JSON.parse(this.responseText);
                console.log(jsonData);
                if (jsonData.results.length == 0) {
                    console.log("hello");
                    document.getElementById("loader").className = "col-sm-6 col-lg-3 final-column-format";
                    setTimeout(function () {
                        alert("Invalid City or Type of Place");
                    }, 100);
                } else {
                    cb(jsonData.results[0].geometry, typeOfPlaceInput)
                };
            }
        };
    }

    function createTextSearchRequest(coords, typeOfPlace) {
        map.setCenter(coords);
        map.setZoom(10)
        const request = {
            query: typeOfPlace,
            location: coords,
            radius: 2500,
        };
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }
    getData(createTextSearchRequest);

}

/*Paginates through all textSearch results to get all 60 results and adds these to a list "allResults". Then calls createReliablePlaces function with allResults as an argument.*/
function callback(results, status, pagination) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            allResults.push(results[i]);
        }
    }
    if (pagination.hasNextPage) {
        pagination.nextPage();
    } else {
        createReliablePlaces(allResults);
        document.getElementById("loader").className = "col-sm-6 col-lg-3 final-column-format";
        document.getElementById("circle").className = "";
        allResults = [];
    }
}

/*Filters out any of the search results with fewer than 15 reviews then sorts these by their "rating" property*/
function createReliablePlaces(results) {
    console.log(results);
    reliablePlaces = [];
    for (let i = 0; i < results.length; i++) {
        results[i].user_ratings_total;
        if (results[i].user_ratings_total >= 15) {
            reliablePlaces.push(results[i])
        }
    }
    console.log(reliablePlaces);
    reliablePlaces.sort((a, b) => {
        // return a.rating > b.rating;
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
    let sameRatingList = [];
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
    if (theList.length == 0) {
        document.getElementById("loader").className = "col-sm-6 col-lg-3 final-column-format";
        alert('Invalid City or Type of Place');
    } else {
        for (var i = 4; i > -1; i = i - 1) {
            createMarker(theList[i], i);
            let lit = `<em><strong>${-i + 5}. ${theList[i].name}</em> | <em>${theList[i].rating}</strong></em> <br>${theList[i].formatted_address}<br>`;
            string = string + lit;
        }
        document.getElementById('results').innerHTML = string;
        document.getElementById('scroll').className = "scroll main-font max-height-459"
    }
}

function createMarker(input, i) {
    const marker = new google.maps.Marker({
        map,
        position: input.geometry.location,
    });
    if (i == 1) {
        infowindow.setContent(
            "<strong><div>" +
            input.rating + "</div></strong>" +
            input.name +
            "<br>" +
            input.formatted_address +
            "</div>"
        );
        infowindow.open(map, marker);
    }

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