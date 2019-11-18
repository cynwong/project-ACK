
/**
 * Construct Map and display in Map container. 
 * @param {array} coords format [longitude, latitude]
 */
function constructMap(coords) {
    if (!(coords instanceof Array) || coords.length === 2) {
        console.log("Wrong data");
        return;
    }
    const map = new mapboxgl.Map({
        accessToken: MAP_KEY,
        container: "map-container",
        style: "mapbox://styles/mapbox/streets-v11",
        center: coords,
        zoom: 14
    });
    new mapboxgl.Market()
        .setLngLat(coords)
        .addTo(map);

    //add map controls
    map.addControl(new mapboxgl.NavigationControl());
}