//TM stands for Ticket Masters
// settings for Ticketmaster data
const TM_SETTTINGS = {
    baseURL: "https://app.ticketmaster.com",
    image: {
        ratio: "16_9",
        width: 640,
        height: 360
    },
    apikey: "J1LIFHjLvkNEcD4gPnYHGcQNfXstsT5J",
};

// for Mapbox
const MAP_KEY = 'pk.eyJ1Ijoicm9zeXRpZ2VyIiwiYSI6ImNrMzQ2dmdnMzB6bjQzY21vanMzcmZwN2gifQ.SmS1JTHUQKYr_roaQIAMFQ';


// Messages for the user.
const MESSAGES = {
    offsales: "Ticket sales are now closed.",
    mapWrongDataType : "Wrong coords data type",
    noResultAdvancedFormError: "given criteria",
    noResultSearchBoxErrorSuffix: "keyword"
}

/**
 * date time format
 * @type string
 */
const DATE_FORMAT = "DD-MMM-YYYY";
const TIME_FORMAT = "hh:mmA";

/**
 * key for local storage
 * @type string
 */ 
const STORAGE_KEY = "favourites";

/**
 * currently viewed event
 * @type object
 */ 
let CURRENT_EVENT;


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