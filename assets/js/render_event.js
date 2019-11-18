
/**
 * Render events for user display. 
 * @param {object} response API response JSON object
 */
function render_events(response){
    const elements = [];
    const {_embedded: {events}} = response;
    const events_container = $("#events-container");

    //first clean up the container
    events_container.empty();

    for(let event of events){
        //update each event information using event template. 
        const eventElement = $(".event.template").clone().removeClass("template");
        const {
            dates:{
                start: {dateTime:startDateTime},
                timezone
            },
            id,
            images,
            name, 
            } = event;
        const imageURL = getImageURL(images);
        const startDate = moment(startDateTime);
        eventElement.attr("data-event-id",id);
        eventElement.find(".image img").attr({
            src: imageURL,
            alt: name
        });
        eventElement.find(".title").text(name);
        eventElement.find(".datetime time").text(startDate.format("DD MMM, YYYY")); 

        if(timezone){
            eventElement.find(".timezone").text(", "+timezone.split("/")[1]);
        }

        
        elements.push(eventElement);
    }
    events_container.append(elements);
}

function getImageURL(imgArray){
    const image_settings = API_SETTTINGS.image;
    return imgArray.filter(
            img => img.ratio.localeCompare(image_settings.ratio)=== 0 && 
                    img.width === image_settings.width && 
                    img.height === image_settings.height
        )[0].url;
}


function render_event_details(response){
    const container = $(".event-details");
    const name = response.name;
    const image = getImage(response.images);


    container.attr("data-event-id",response.id);

    // title section
    container.find(".official-link").attr({
        href: response.url,
        target:"_blank"
    });

    container.find(".title").text(name);

    //image section
    container.find(".image-section img").attr({
        src: image.url,
        alt: name
    });

    // description section
    container.find(".description-section").append(
        $("<p>").addClass("info").text(response.info)
    )

    if(response.pleaseNote){
        container.find(".description-section").append(
            $("<p>").addClass("please-note").text(response.pleaseNote)
        );
    }

    //venue section
    const venues = [];
    for(let v of response._embedded.venues){
        if(venues.length!==0){
            venues.push($("<span>").text(", "));
        }
        venues.push($("<a>",{
            text: v.name,
            href:v.url,
            target: "_blank",
            "data-id": v.id
        }));
    }
    
    container.find(".venue").append(venues);
    
}