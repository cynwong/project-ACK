$(document).ready(function () {

    $(".searchbykeyword").on("click", function (event) {
        event.preventDefault();
        var name = $(".keyword").val().toLowerCase().trim();
        console.log(name);
        var generalsearchURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&keyword=" + name + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
        $.ajax({
            url: generalsearchURL,
            method: "GET"
        }).then(function (response) {
            render_events(response);
        });
    });

    $(".submit").on("click", function (event) {
        event.preventDefault();
        var country = $(".country").val().toLowerCase().trim();
        var city = $(".city").val().toLowerCase().trim();
        var keyword = $(".eventkeyword").val().toLowerCase().trim();
        var classification = $('#classification :selected').val().trim();
        var countryCode = "";
        if (country !== "") {
            var countryURL = "https://restcountries.eu/rest/v2/name/" + country;
            $.ajax({
                url: countryURL,
                method: "GET"
            }).then(function (response) {
                countryCode = response[0].alpha2Code;

                var withCountryCodeURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=" + classification + "&countryCode=" + countryCode + "&keyword=" + keyword + "&city=" + city + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
                $.ajax({
                    url: withCountryCodeURL,
                    method: "GET"
                }).then(function (response) {

                    render_events(response);
                });
            });
        } else {
            var withoutCountryCodeURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&classificationName=" + classification + "&keyword=" + keyword + "&city=" + city + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
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
        var learnmoreURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&id=" + learnmore + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
            $.ajax({
                url: learnmoreURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
            });
    });

    $(".cancel").on("click", function(){
        $(".country").val("");
        $(".city").val("");
        $(".eventkeyword").val("");
        $('#classification').val("Choose here");
    });

});