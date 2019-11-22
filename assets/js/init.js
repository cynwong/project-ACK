$(document).ready(function () {

    //assign an event handler to Search button for quick search
    $(".searchbykeyword").on('click', function (event) {
        event.preventDefault();
        searchByKeyword();
    });

    // assign an event handler to Enter button for direct quick search from text input

    $("#inputText").on('keypress', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            searchByKeyword();
        }

    });

    
    $(".submit").on("click", function (event) {
        event.preventDefault();
        const country = $(".country").val().toLowerCase().trim();
        const city = $(".city").val().toLowerCase().trim();
        const keyword = $(".eventkeyword").val().toLowerCase().trim();
        const classification = $('#classification :selected').text().trim();
        let countryCode = "";
        let url = "";
        if (country !== "") {
            const countryURL = "https://restcountries.eu/rest/v2/name/" + country;
            $.ajax({
                url: countryURL,
                method: "GET"
            }).then(function (response) {
                countryCode = response[0].alpha2Code;
                url = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=" + classification + "&countryCode=" + countryCode + "&keyword=" + keyword + "&city=" + city + "&apikey=" + TM_SETTTINGS.apikey;
                getSearchResult(url);
            });
        } else {
            url = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=" + classification + "&keyword=" + keyword + "&city=" + city + "&apikey=" + TM_SETTTINGS.apikey;
            getSearchResult(url);
        }
    });

    
    $("#events-container").on("click", ".show-details", function () {
        //get details data from API
        getDetails($(this).attr("data-event-id"));
        
    });

    $(".cancel").on("click", function () {
        $(".country").val("");
        $(".city").val("");
        $(".eventkeyword").val("");
        $('#classification option').eq(0).prop("selected", true);
    });

    $(".error-message button.delete").click(event => {
        $(event.target).closest(".error-message").hide();
    });

});