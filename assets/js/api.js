$(document).ready(function () {
    const searchByKeyword = function() {
        var name = $(".keyword").val().toLowerCase().trim();
        console.log(name);
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&keyword=" + name + "&apikey=" + TM_SETTTINGS.apikey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            render_events(response);
        });
    }

    //assign an event handler to Search button for quick search
    $(".searchbykeyword").on('click', function (event) {
        event.preventDefault();
        searchByKeyword();
    });

    // assign an event handler to Enter button for direct quick search from text input
    
    $("#inputText").on('keypress', function (event) {
        if (event.keyCode === 13 ) {
            event.preventDefault();
            searchByKeyword();
        }

    });

    $(".submit").on("click", function (event) {
        event.preventDefault();
        var country = $(".country").val().toLowerCase().trim();
        var city = $(".city").val().toLowerCase().trim();
        var keyword = $(".eventkeyword").val().toLowerCase().trim();
        var classification = $('#classification :selected').text().trim();
        var countryCode = "";
        if (country !== "") {
            var countryURL = "https://restcountries.eu/rest/v2/name/" + country;
            $.ajax({
                url: countryURL,
                method: "GET"
            }).then(function (response) {
                countryCode = response[0].alpha2Code;

                var withCountryCodeURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=" + classification + "&countryCode=" + countryCode + "&keyword=" + keyword + "&city=" + city + TM_SETTTINGS.apikey;
                $.ajax({
                    url: withCountryCodeURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    render_events(response);
                });
            });
        } else {
            var withoutCountryCodeURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=" + classification + "&keyword=" + keyword + "&city=" + city + TM_SETTTINGS.apikey;
            $.ajax({
                url: withoutCountryCodeURL,
                method: "GET"
            }).then(function (response) {
                render_events(response);
            });
        }
    });

    $("#events-container").on("click", ".show-details", function(){
        var learnmore = $(this).attr("data-event-id");
        var learnmoreURL = "https://app.ticketmaster.com/discovery/v2/events/" + learnmore + ".json?" + aTM_SETTTINGS.apikey;
            $.ajax({
                url: learnmoreURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                render_event_details(response);
            });
    });

    $(".cancel").on("click", function(){
        $(".country").val("");
        $(".city").val("");
        $(".eventkeyword").val("");
        $('#classification option').eq(0).prop("selected",true);
    });

});