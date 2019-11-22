
/**
 * Construct Map and display in Map container. 
 * 
 * @param {number[]} coords format [longitude, latitude]
 * 
 */
const constructMap = function (coords) {
    // check if coords are in correct form
    if (!(coords instanceof Array) || coords.length !== 2) {
        console.log(MESSAGES.mapWrongDataType);
        return;
    }

    //create a mapbox object
    const map = new mapboxgl.Map({
        accessToken: MAP_KEY,
        container: "map-container",
        style: "mapbox://styles/mapbox/streets-v11",
        center: coords,
        zoom: 14
    });

    //create and add a marker at the coordinates. 
    new mapboxgl.Marker()
        .setLngLat(coords)
        .addTo(map);

    //add map controls
    map.addControl(new mapboxgl.NavigationControl());
}