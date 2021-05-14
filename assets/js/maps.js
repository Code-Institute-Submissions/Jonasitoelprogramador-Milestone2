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

window.addEventListener("load", takeCityInput);

/*Taken from stack overflow https://stackoverflow.com/questions/5384712/intercept-a-form-submit-in-javascript-and-prevent-normal-submission*/
/*The below function is called once the main window is loaded.  This adds an event listener to the form section in the HTML which listens for a submit action.  Once the submit action occurs, the form input data is passed to the nameToCoord function and that function is called*/
function takeCityInput() {
    document.getElementById('my-form').addEventListener("submit", function (e) {
        e.preventDefault();
        /*End of borrowed section*/
        document.getElementById('scroll').className = "";
        string = "";
        document.getElementById('results').innerHTML = "";
        document.getElementById("loader").className = "col-sm-12 col-md-6 col-lg-3 final-column-format loading-screen";
        document.getElementById("circle").className = "lds-circle";
        cityIntput = document.getElementById('my-form').elements['city'].value;
        typeOfPlaceInput = document.getElementById('my-form').elements['type_of_place'].value;
        nameToCoord(cityIntput, typeOfPlaceInput);
    });
}

/*The below function is inspired by code institute code on the following page, however, it has been significantly modified for my own purpose: https://learn.codeinstitute.net/courses/course-v1:CodeInstitute+IFD101+2017_T3/courseware/d9c42d8f3a174e5bae5dd2eb9ace629d/7c2d321daf6941818efbe43e42f0c62d/?child=first
The createTextSearchRequest function is passed into the getData function which uses the api to transform the input of the city parameter in the html form into coordinates.  These coordinates are passed into the createTextSearchRequest coupled witht he type of place input.  The output is a valid TextSearch request
which is passed to the TextSearch function in the Google Maps Javascript API.
Find out more about the api being used in the below function here: https://opencagedata.com/api.*/
function nameToCoord(cityIntput, typeOfPlaceInput) {
    function getData(cb) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", `https://api.opencagedata.com/geocode/v1/json?q=(${cityIntput}&key=9b798510a3344259b8f4f319f7935472`);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonData = JSON.parse(this.responseText);
                if (jsonData.results.length == 0) {
                    document.getElementById("loader").className = "col-sm-12 col-md-6 col-lg-3 final-column-format";
                    setTimeout(function () {
                        alert("Invalid City or Type of Place");
                    }, 100);
                } else {
                    cb(jsonData.results[0].geometry, typeOfPlaceInput);
                }
            }
        };
    }
    /*End of borrowed code*/

    function createTextSearchRequest(coords, typeOfPlace) {
        map.setCenter(coords);
        map.setZoom(10);
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
        document.getElementById("loader").className = "col-sm-12 col-md-6 col-lg-3 final-column-format";
        document.getElementById("circle").className = "";
        allResults = [];
    }
}

/*Filters out any of the search results with fewer than 15 reviews then sorts these by their "rating" property*/
function createReliablePlaces(results) {
    reliablePlaces = [];
    for (let i = 0; i < results.length; i++) {
        if (results[i].user_ratings_total >= 15) {
            reliablePlaces.push(results[i]);
        }
    }
    reliablePlaces.sort((a, b) => {
        if (a.rating > b.rating) {
            return 1;
        } else {
            return -1;
        }
    });
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
    }
    /*taken from https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/ */
    sameRatingList.sort((a, b) => {
        if (a.user_ratings_total > b.user_ratings_total) {
            return 1;
        } else {
            return -1;
        }
        /*End of borrowed section*/
    });
    fiveBest = reliablePlaces.slice(Math.max(reliablePlaces.length - 5, 1));
    var counter = 0;
    for (i = 0; i < fiveBest.length; i++) {
        if (fiveBest[i].rating == numberFive.rating) {
            counter = counter + 1;
        }
    }
    createFinalList(sameRatingList, fiveBest, counter);
}

/*The counter variable is used to manipulate the final list that is passed to the createMarker function
 in order that if several places have the same rating, the ones that are included in the final list are 
 prioritized by the number of reviews that they have.  This function also places the list in a template literal
 which displays the list on the web app*/
function createFinalList(sameRatingList, fiveBest, counter) {
    var temporaryList = fiveBest.slice(-(5 - counter));
    var mostReviewsList = sameRatingList.slice(-counter);
    var theList = mostReviewsList.concat(temporaryList);
    for (var i = 4; i > -1; i = i - 1) {
        createMarker(theList[i], i);
        let lit = `<em><strong>${-i + 5}. ${theList[i].name}</em> | <em>${theList[i].rating}</strong></em> <br>${theList[i].formatted_address}<br>`;
        string = string + lit;
    }
    document.getElementById('results').innerHTML = string;
    document.getElementById('scroll').className = "scroll main-font max-height-459";
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
    });

}