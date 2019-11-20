$(document).ready(function () {

    //assign an event handler to Search button for quick search

    $(".searchbykeyword").on('click', function (event) {
        event.preventDefault();
        var name = $(".keyword").val().toLowerCase().trim();
        console.log(name);
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + name + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            render_events(response);
        });
    });

    // assign an event handler to Enter button for direct quick search from text input
    
    $("#inputText").on('keypress', function (event) {
        if (event.keyCode === 13 )
        {
        event.preventDefault();
        var name = $(".keyword").val().toLowerCase().trim();
        console.log(name);
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + name + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            render_events(response);
        });
    }

    });

    $(".submit").on("click", function (event) {
        event.preventDefault();
        var country = $(".country").val().toLowerCase().trim();
        var city = $(".city").val().toLowerCase().trim();
        var keyword = $(".eventkeyword").val().toLowerCase().trim();
        var countryCode = "";
        if (country !== "") {
            var secondqueryURL = "https://restcountries.eu/rest/v2/name/" + country;
            $.ajax({
                url: secondqueryURL,
                method: "GET"
            }).then(function (response) {
                countryCode = response[0].alpha2Code;
                console.log(countryCode);
                var thirdqueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=arts,comedy&theatre&countryCode=" + countryCode + "&keyword=" + keyword + "&city=" + city + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
                $.ajax({
                    url: thirdqueryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                });
            });
        } else {
            var fourthqueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=arts,comedy&theatre&countryCode=" + countryCode + "&keyword=" + keyword + "&city=" + city + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
            $.ajax({
                url: fourthqueryURL,
                method: "GET"
            }).then(function (response) {

            });
        }




    });
});