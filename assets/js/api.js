$(document).ready(function () {
    const searchByKeyword = function() {
        var name = $(".keyword").val().toLowerCase().trim();
        console.log(name);
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&keyword=" + name + "&apikey=" + TM_SETTTINGS.apikey;
        $.ajax({
            url: generalsearchURL,
            method: "GET"
        }).then(function (response) {
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

<<<<<<< HEAD
                var withCountryCodeURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=" + classification + "&countryCode=" + countryCode + "&keyword=" + keyword + "&city=" + city + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
=======
                var withCountryCodeURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=" + classification + "&countryCode=" + countryCode + "&keyword=" + keyword + "&city=" + city + "&apikey=" + TM_SETTTINGS.apikey;
>>>>>>> 56f7284da550ad2dd4e3ae68ef64899f9b513f5f
                $.ajax({
                    url: withCountryCodeURL,
                    method: "GET"
                }).then(function (response) {
<<<<<<< HEAD

=======
                    console.log(response);
>>>>>>> 56f7284da550ad2dd4e3ae68ef64899f9b513f5f
                    render_events(response);
                });
            });
        } else {
<<<<<<< HEAD
            var withoutCountryCodeURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=" + classification + "&keyword=" + keyword + "&city=" + city + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
=======
            var withoutCountryCodeURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=" + classification + "&keyword=" + keyword + "&city=" + city + "&apikey=" + TM_SETTTINGS.apikey;
>>>>>>> 56f7284da550ad2dd4e3ae68ef64899f9b513f5f
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
<<<<<<< HEAD
        var learnmoreURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&id=" + learnmore + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
=======
        var learnmoreURL = "https://app.ticketmaster.com/discovery/v2/events/" + learnmore + ".json?" + "&apikey=" + aTM_SETTTINGS.apikey;
>>>>>>> 56f7284da550ad2dd4e3ae68ef64899f9b513f5f
            $.ajax({
                url: learnmoreURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
<<<<<<< HEAD
=======
                render_event_details(response);
>>>>>>> 56f7284da550ad2dd4e3ae68ef64899f9b513f5f
            });
    });

    $(".cancel").on("click", function(){
        $(".country").val("");
        $(".city").val("");
        $(".eventkeyword").val("");
<<<<<<< HEAD
        $('#classification').val("Choose here");
=======
        $('#classification option').eq(0).prop("selected",true);
>>>>>>> 56f7284da550ad2dd4e3ae68ef64899f9b513f5f
    });

});