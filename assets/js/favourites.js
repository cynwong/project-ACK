
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
    const container = $(".favourites-container");
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

        favElement.attr("id", favourite.id);
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
                const title = pinned.find(".event-title");
                //update pinned section
                pinned.find(".days").text(daysLeft).data("days", daysLeft);
                pinned.find(".hours").text(hoursLeft).data("hours", hoursLeft);
                pinned.find(".minutes").text(minutesLeft).data("minutes", minutesLeft);
                pinned.find(".seconds").text(secondsLeft).data("seconds", secondsLeft);

                title.attr("data-index", i);
                title.attr("id", favourite.id);
                title.text(favourite.name);
                daysLeftToNext = daysLeft;
                if(TIMER_ID){
                    //clear previous timer. 
                    clearInterval(TIMER_ID);
                }
                //start the timer
                TIMER_ID = setInterval(() => {
                    const pinned = $(".pinned-container");
                    const secondsElement = pinned.find(".seconds");
                    let seconds = parseInt(secondsElement.data("seconds"));
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
                        minutesElement.data("minutes", minutes);
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
    //add favourites to the container for display
    container.append(elements);

    showFavourites();
    
}

function hideFavourites(){
    const favContainer = $(".favourites-wrapper");
    //show no favourite message
    favContainer.find("#no-favourites").show();

    //hide everything else
    favContainer.find(".pinned-container").hide();
    favContainer.find(".favourites-container").hide();

}

function showFavourites(){
    const favContainer = $(".favourites-wrapper");
    //hide no favourite message
    favContainer.find("#no-favourites").hide();

    //show everything else
    favContainer.find(".pinned-container").show();
    favContainer.find(".favourites-container").show();

}
/**
 * Set current event by index in FAVOURITES
 *  and render the details page for user display
 * @param {number} index 
 */
function resetCurrentEvent(index) {
    //reset CURRENT_EVENT
    CURRENT_EVENT = FAVOURITES[index];

    render_event_details();
}

