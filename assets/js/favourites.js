
/**
 * @type object[]
 */
let FAVOURITES = [];

/**
 * @type StorageHandler 
 */
const STORAGE = new StorageHandler(STORAGE_KEY, FAVOURITES);
/**
 * @type intervalID
 */
let TIMER_ID;

function populateFavourites() {
    const container = $(".favouites-container");
    const elements = [];
    const today = moment();
    const length = FAVOURITES.length;
    let daysLeftToNext = Number.POSITIVE_INFINITY;
    //clean up the container
    container.empty();
    for (let i = 0; i < length; i++) {
        const favourite = FAVOURITES[i];
        const favElement = $(".favourite.template").clone().removeClass("template");
        const favDate = moment(favourite.dates.start);

        favElement.attr("data-id", favourite.id);
        favElement.attr("data-index", i);
        favElement.find(".title").text(favourite.name);
        if (favDate.isSameOrBefore(today)) {
            favElement.find(".days").text("0");
            favElement.addClass("past");
        } else {
            const daysLeft = favDate.diff(today, "days");
            if (daysLeft < daysLeftToNext) {
                const pinned = $(".pinned-container");
                const hoursLeft = favDate.diff(today, "hours") - (daysLeft * 24);
                const minutesLeft = favDate.diff(today, "minutes") - (hoursLeft * 60) - (daysLeft * 24 * 60);
                const secondsLeft = favDate.diff(today, "seconds") - (minutesLeft * 60) - (hoursLeft * 60 * 60) - (daysLeft * 24 * 60 * 60);

                //update pinned section
                pinned.find(".days").text(daysLeft).data("days", daysLeft);
                pinned.find(".hours").text(hoursLeft).data("hours", hoursLeft);
                pinned.find(".minutes").text(minutesLeft).data("minutes", minutesLeft);
                pinned.find(".seconds").text(secondsLeft).data("seconds", secondsLeft);
                pinned.find(".event-title").text(favourite.name);
                daysLeftToNext = daysLeft;
                //start the timer
                TIMER_ID = setInterval(() => {
                    const pinned = $(".pinned-container");
                    const secondsElement = pinned.find(".seconds");
                    let seconds = parseInt(secondsElement.data("seconds"));
                    console.log(seconds)
                    if (seconds === 0) {
                        const minutesElement = pinned.find(".minutes");
                        let minutes = parseInt(minutesElement.data("minutes"));

                        if (minutes === 0) {
                            const hoursElement = pinned.find(".hours");
                            let hours = parseInt(hoursElement.data("hours"));

                            if (hours === 0) {
                                const daysElement = pinned.find(".days");
                                let days = parseInt(daysElement.data("days"));
                                //reduce one day and reset hours to 24
                                days--;
                                hours = 24;
                                //update daysElement
                                daysElement.text(days);
                                daysElement.data("days", days);
                            }
                            //reduce one hours and reset minutes
                            hours--;
                            minutes = 60;
                            //update hours element
                            hoursElement.text(hours);
                            hoursElement.data("hours", hours);
                        }
                        //reduce one minute and reset seconds
                        minutes--;
                        seconds = 60;
                        //update minutes element
                        minutesElement.text(minutes);
                        minutesElement.data("minutes",minutes);
                    }
                    //reduce seconds by one
                    seconds--;
                    //update second element
                    secondsElement.text(seconds);
                    secondsElement.data("seconds", seconds);

                }, 1000);
                continue;
            }
            favElement.find(".days").text(daysLeft);
        }

        elements.push(favElement);
    }

    container.append(elements);


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

