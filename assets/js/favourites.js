
/**
 * @type object[]
 */
const FAVOURITES = [];

/**
 * @type StorageHandler 
 */
const STORAGE = new StorageHandler(STORAGE_KEY, FAVOURITES);


/**
 * Find an event in Favourite list by id
 * @param {number|string} id 
 * @return {object} event in Favourites List. 
 */
function findFavourite(id) {
    return FAVOURITES.find((event) => event.id === id);
}

/**
 *  Add new Favourite
 * @param {object} event 
//  */
// function addFavourite(event){
//     FAVOURITES.push(event);
// }

/**
 * remove Favourite by id
 * @param {number|string} id
 */
function removeFavourite(id){
    const index = FAVOURITES.findIndex(event=>event.id === id);

    FAVOURITES.splice(index,1);
    
}

const PINNED = {};

$(document).ready(function(){
    $("#event-details-container").on("click", "button.toggle-favourite", function(){
        const target = $(this);

        if(target.hasClass("saved")){
            // delete the current event 
            target.removeClass("saved");
            const id = arget.closest(".event-details").data("eventid");
            const index = FAVOURITES.findIndex(event=>event.id === id);

            FAVOURITES.splice(index,1);
        }else{
            //add this event to favourite
            target.addClass("saved");
            FAVOURITES.push(CURRENT_EVENT);
        }
    });
});