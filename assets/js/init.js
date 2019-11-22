$(document).ready(function () {

    // load favourites list from local storage.
    FAVOURITES = STORAGE.data;
    if (FAVOURITES.length !== 0) {
        populateFavourites();
    }else{
        hideFavourites();
    }

    // ==========================================
    //  Handlers for searchbox in title/nav bar
    // ==========================================
    // assign an event handler to Search button for quick search,
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

    // ==========================================
    //  Handlers for Error message section
    // ==========================================

    // close buttons' listener
    $(".error-message button.delete").click(event => {
        $(event.target).closest(".error-message").hide();
    });

    // ==========================================
    //  Handlers for Favourites section
    // ==========================================

    // click on title with count down
    $(".pinned-container .event-title").click(event => {
        event.preventDefault();
        resetCurrentEvent($(".pinned-container .event-title").data("index"));
    });

    // click on title in favourites list
    $(".favourites-container").on("click", ".favourite .title", function (event) {
        event.preventDefault();
        resetCurrentEvent($(this).closest(".favourite").data("index"));
    });

    // ==========================================
    //  Handlers for Advance Search Form
    // ==========================================
    
    // submit button
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

    // cancel button
    $(".cancel").on("click", function () {
        $(".country").val("");
        $(".city").val("");
        $(".eventkeyword").val("");
        $('#classification option').eq(0).prop("selected", true);
    });

    
    // ===============================================
    //  Handlers for search results / events section
    // ===============================================

    // when "Learn More" link is clicked
    $("#events-container").on("click", ".show-details", function () {
        //get details data from API
        getDetails($(this).attr("data-event-id"));
        
    });

    // ===============================================
    //  Handlers for event details (modal) section
    // ===============================================
    
    // when toggle-favourite button is clicked. 
    $("#details-container").on("click", "button.toggle-favourite", function () {
        const id = $(".event-details").attr("data-event-id");
        const index = FAVOURITES.findIndex(favourite => favourite.id === id);

        if (index !== -1) {
            // event in favourites 
            // so delete the current event 
            $(this).removeClass("is-inverted");
            FAVOURITES.splice(index, 1);
        } else {
            // not in Favourites list
            //add this event to favourite
            $(this).addClass("is-inverted");
            const newFavourite = {
                attractions: CURRENT_EVENT.attractions,
                classifications: CURRENT_EVENT.classifications,
                dates: CURRENT_EVENT.dates,
                id: CURRENT_EVENT.id,
                imageUrl: CURRENT_EVENT.imageUrl,
                info: CURRENT_EVENT.info,
                name: CURRENT_EVENT.name,
                pleaseNote: CURRENT_EVENT.pleaseNote,
                sales: CURRENT_EVENT.sales,
                url: CURRENT_EVENT.url,
                venues: CURRENT_EVENT.venues
            };
            FAVOURITES.push(newFavourite);
            if (FAVOURITES.length >= 2) {
                FAVOURITES.sort((fav1, fav2) => {
                    const date1 = moment(fav1.dates.start);
                    const date2 = moment(fav2.dates.start);

                    if (date1.isBefore(date2) === true) {
                        return -1;
                    } else if (date1.isSame(date2) === true) {
                        return 0;
                    } else if (date1.isAfter(date2) === true) {
                        return 1;
                    }
                });
            }
        }
        STORAGE.data = FAVOURITES;
        if (FAVOURITES.length === 0) {
            clearInterval(TIMER_ID);
            hideFavourites();
        } else {
            populateFavourites();
        }
    });

    // when close button in modal is clicked
    $(".modal-close").click(function () {
        $(".modal").removeClass("is-active");
    });
});

