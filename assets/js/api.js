
/**
 * Display API fail error message to user and write out detail error object in console.
 * @param {object} error - error response object
 */
const displayFailMessage = function (error) {
    //display error message to user
    $("#api-fail-error").show();

    //write out error message in console for debugging purpose
    console.log({ error });

    //hide data contents
    hideDataContainers();
}

/**
 * Retrieve Ticketmaster Event details by ID and display it to the user. 
 * @param {string} id - Ticketmaster event id 
 */
const getDetails = function (id){
    disbledButtons();
    const url = "https://app.ticketmaster.com/discovery/v2/events/" + id + ".json?" + "&apikey=" + TM_SETTTINGS.apikey;
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        parseDetailsResponse(response);
        render_event_details();
    });
}
/**
 * Retrieve search result from Ticketmaster API
 * @param {string} url - URL string to make AJAX call
 */
const getSearchResult = function (url){
    $.ajax({
        url: url,
        method: "GET"
    })
    .done(render_events)
    .fail(displayFailMessage);
}

/**
 * Search by keyword function for general search (search box in title/nav bar)
 * Make ajax call to API to retrive and display the data to the user. 
 */
const searchByKeyword = function () {
    disbledButtons();
    const name = $(".keyword").val().toLowerCase().trim();
    if (name.length === 0) {
        //no keyword so prompt the user
        $("#no-keyword-error").show();
        //hide data contents not to confuse the users.
        hideDataContainers();
        return;
    }

    // make the ajax call to API. 
    const queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&keyword=" + name + "&apikey=" + TM_SETTTINGS.apikey;
    getSearchResult(queryURL);
   
}


