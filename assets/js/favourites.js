
/**
 * @type object[]
 */
let FAVOURITES = [];

/**
 * @type StorageHandler 
 */
const STORAGE = new StorageHandler(STORAGE_KEY, FAVOURITES);


function populateFavourites(){
    
}

$(document).ready(function () {
    FAVOURITES = STORAGE.data;
    

    $("#event-details-container").on("click", "button.toggle-favourite", function () {
        const target = $(this);

        if (target.hasClass("saved")) {
            // delete the current event 
            target.removeClass("saved");
            const id = target.closest(".event-details").data("eventid");
            const index = FAVOURITES.findIndex(event => event.id === id);

            FAVOURITES.splice(index, 1);
        } else {
            //add this event to favourite
            target.addClass("saved");
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
            FAVOURITES.sort(fav1, fav2 => {
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
        STORAGE.data = FAVOURITES;
    });

    $(".modal-close").click(function () {
        $(".modal").removeClass("is-active");
    })
});

