$(document).ready(function () {

    $(".searchbykeyword").on("click", function (event) {
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

    $(".submit").on("click", function (event) {
        event.preventDefault();
        var country = $(".country").val().toLowerCase().trim();
        var city = $(".city").val().toLowerCase().trim();
        
        if (country !== "") {
        var countryCode;      
        var secondqueryURL = "https://restcountries.eu/rest/v2/name/" + country;
        $.ajax({
            url: secondqueryURL,
            method: "GET"
        }).then(function (response) {
       
            countryCode = response[0].alpha2Code;
            console.log(countryCode);
            var thirdqueryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=arts,comedy&theatre&countryCode="+ countryCode +"&startDateTime=2019-11-16T14:00:00Z&endDateTime=2019-12-31T14:00:00Z&city=" + city + "&apikey=J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J"
            $.ajax({
                url: thirdqueryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
            });

        });
        } else {
            alert ("Please enter a country name!!!");
            return;
        }
    
     


    });
});