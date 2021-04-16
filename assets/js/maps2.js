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
            lat: 48.8566,
            lng: 2.3522
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
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                details(results[i]);
                console.log(results[i]);
            }
        }
        /*if (results.hasNextPage == True) {
            results.nextPage()
        } else {
            map.center = (36.51543, -4.88583)
        }*/
    }
};


function details(place) {
    var quest = {
        placeId: place.place_id,
        fields: ["name", "formatted_address", "place_id", "geometry"],
    };
    service.getDetails(quest, (place, status) => {
        /*if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location)*/
        {
            console.log(place)
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
            })
        };
    })
}