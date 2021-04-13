let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: -25.344,
            lng: 131.036
        },
        zoom: 8,
    });

    const marker = new google.maps.Marker({
        position: {
            lat: -25.344,
            lng: 131.036
        },
        map: map,
    });
}