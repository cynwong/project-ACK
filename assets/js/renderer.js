/**
 * find the image according to API settings. 
 * @param {object[]} imgArray 
 */
function getImageURL(imgArray) {
    const image_settings = TM_SETTTINGS.image;
    return imgArray.filter(
        img => img.ratio.localeCompare(image_settings.ratio) === 0 &&
            img.width === image_settings.width &&
            img.height === image_settings.height
    )[0].url;
}

/**
 * @typedef {object} tm_response_events
 * @property {object[]} _embedded.events - list of events objects
 * @property {string} _embedded.events.name - name of the event
 * @property {string} _embeded.events.dates.start.dateTime - UTC format date time
 * @property {string} _embeded.events.dates.start.timezone - time's timezone
 * @property {string} _embedded.events.id - event id
 * @property {object[]} _embedded.events.images - array of image data
 */
/**
 * Render events for user display. 
 * @param {tm_response_events} response API response JSON object
 */
function render_events(response) {
    const elements = [];
    const { _embedded: { events } } = response;
    const events_container = $("#events-container");

    //first clean up the container
    events_container.empty();

    for (let event of events) {
        //update each event information using event template. 
        const eventElement = $(".event.template").clone().removeClass("template");
        const {
            dates: {
                start: { dateTime: startDateTime },
                timezone
            },
            id,
            images,
            name,
        } = event;
        const imageURL = getImageURL(images);
        const startDate = moment(startDateTime);

        eventElement.attr("data-event-id", id);
        eventElement.find(".show-details").attr("data-event-id",id)
        eventElement.find(".image img").attr({
            src: imageURL,
            alt: name
        });
        eventElement.find(".title").text(name);
        eventElement.find(".datetime time").text(startDate.format("DD MMM, YYYY"));

        if (timezone) {
            eventElement.find(".timezone").text(", " + timezone.split("/")[1]);
        }

        elements.push(eventElement);
    }
    events_container.append(elements);
}

let CURRENT_EVENT;

function parseDetailsResponse(response){
    const {
        name,
        id,
        url,
        images,
        sales,
        dates: {
            start: {
                dateTime
            },
            timezone,
            status: { code: salesStatus }
        },
        classifications,
        info,
        pleaseNote,
        _embedded: {
            venues,
            attractions
        }
    } = response;

    CURRENT_EVENT = {
        id,
        name,
        url, 
        imageUrl: getImageURL(images),
        sales: parseSalesData(sales),
        dates:{
            start: dateTime,
            timezone,
            status: salesStatus
        },
        classifications,
        info,
        pleaseNote,
        venues: parseVenues(venues),
        attractions: parseAttractions(attractions)
    };


    function parseSalesData(sales){
        let salesDetails = [];
        for(let [key,data] of Object.entries(sales)){
            let s = {
                name: key,
                start: data.startDateTime,
                end: data.endDateTime
            }
            salesDetails.push(s);
        }
        return salesDetails;
    }

    function parseVenues(data){
        let venues = [];
        for (let d of data) {
            let v = {
                name: d.name,
                id: d.id,
                url: d.url,
                longitude: d.location.longitude,
                latitude: d.location.latitude
            };
            venues.push(v);
        }
        return venues;
    }

    function parseAttractions(data){
        let attractions = [];
        for (let attraction of data) {
            attractions.push({
                name: attraction.name,
                id: attraction.id,
                url: attraction.url,
            });
        }
        return attractions;
    }
}


/**
 * Render event detail page according to response object's data
 * @param {JSON object} response 
 */
function render_event_details(response) {
    const container = $(".event-details");
    parseDetailsResponse(response);

    container.attr("data-event-id", CURRENT_EVENT.id);

    // ----- title section ----- 
    container.find(".title").text(CURRENT_EVENT.name);

    // ----- attraction section ----- 
    let attractionLinks = [];
    const attractionSection = container.find(".attraction-section");
    //clean attraction Section first
    attractionSection.empty();
    //now populate the data
    for (let attraction of CURRENT_EVENT.attractions) {
        if (attractionLinks.length !== 0) {
            attractionLinks.push($("<span>").text(", "));
        }
        attractionLinks.push($("<a>", {
            class: "attraction",
            "data-attraction-id": attraction.id,
            href: attraction.url,
            text: attraction.name
        }));
    }
    attractionSection.append(attractionLinks);

    // ----- image section ----- 
    container.find(".image-section img").attr({
        src: CURRENT_EVENT.imageUrl,
        alt: "Event Logo"
    });

    // ----- classification-section ----- 
    const classSection = container.find(".classifications");
    //clean classification section
    classSection.empty();
    let classItems;
    for (let c of CURRENT_EVENT.classifications) {
        classItems = [];
        for (let content of Object.values(c)) {
            if (content instanceof Object && content.name.toLowerCase().localeCompare("undefined") !== 0) {
                const li = $("<li>");
                li.attr("id", c.id);
                li.text(content.name);
                classItems.push(li);
            }
        }
        classSection.append($("<ul>").append(classItems));
    }

    // ----- description section ----- 
    const descriptionSection = container.find(".description-section");
    //clean description section first. 
    descriptionSection.empty();
    //insert data to description section
    descriptionSection.append(
        $("<p>").addClass("info").text(CURRENT_EVENT.info)
    )

    if (CURRENT_EVENT.pleaseNote) {
        descriptionSection.append(
            $("<p>").addClass("please-note").text(CURRENT_EVENT.pleaseNote)
        );
    }

    // ----- sales dates section ----- 
    const salesSection = container.find(".sales-dates");
    //clean sales section
    salesSection.empty();
    // populate sales dates. 
    if (CURRENT_EVENT.dates.status.toLowerCase().localeCompare("offsale") === 0) {
        salesSection.text(MESSAGES.offsales);
    } else {
        const salesInfo = [];
        for (let sale of CURRENT_EVENT.sales) {
            const p = $("<p>");
            const content = moment(sale.startDateTime).format(DATE_FORMAT) +
                " to " +
                moment(sale.EndDateTime).format(DATE_FORMAT);
            const header = $("<strong>").text(sale.name.charAt(0).toUpperCase() + sale.name.substring(1));
            p.text(`: ${content}`);
            p.prepend(header);
            salesInfo.push(p);
        }
        salesSection.append(salesInfo);
    }

    // ----- event dates section ----- 

    const date = moment(CURRENT_EVENT.dates.start).format(`${DATE_FORMAT} ${TIME_FORMAT}`);

    container.find(".event-dates-section time").text(date);
    container.find(".event-dates-section .timezone").text(CURRENT_EVENT.dates.timezone.split("/")[1]);



    // ----- venue section ----- 
    const venueElements = [];
    const venueContainer = container.find(".venues-container");
    //clean venue container first
    venueContainer.empty();
    //populate the data. 
    for (let v of CURRENT_EVENT.venues) {
        if (venueElements.length !== 0) {
            venueElements.push($("<span>").text(", "));
        }
        venueElements.push($("<a>", {
            text: v.name,
            href: v.url,
            target: "_blank",
            "data-id": v.id
        }));
    }

    venueContainer.append(venueElements);

    // ----- map section -----
    const longitude = CURRENT_EVENT.venues[0].longitude;
    const latitude = CURRENT_EVENT.venues[0].latitude;
    const coords = [];
    coords.push(parseFloat(longitude));
    coords.push(parseFloat(latitude));
    constructMap(coords);

    // ----- TM-Link-section ------
    container.find(".official-link").attr({
        href: CURRENT_EVENT.url,
    });

    //now display the container. 
    container.closest(".modal").addClass("is-active");
    container.show();
}