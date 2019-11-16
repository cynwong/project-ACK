$(document).ready(function(){
    // render_events(response);
    // render_events(response);
    // render_events(response);
    // render_events(response);
    // render_events(response);
    render_event_details(EVENT_DETAIL);
});


/**
 * Render events for user display. 
 * @param {object} response API response JSON object
 */
function render_events(response){
    const elements = [];

    for(let e of response._embedded.events){
        //render each event
        const event = $(".event.template").clone().removeClass("template");
        const name = e.name;
        const image = getImage(e.images);

        event.attr("data-event-id",e.id);
        event.find(".image img").attr({
            src: image.url,
            alt: e.name
        });
        event.find(".title a").text(name);
        event.find(".content").text(e.info);
        event.find(".datetime time").text(e.dates.start.localDate);
        elements.push(event);
    }
    $("#events-container").append(elements);
}

function getImage(imgArray){
    const image_settings = API_SETTTINGS.image;
    return imgArray.filter(
            img => img.ratio.localeCompare(image_settings.ratio)=== 0 && 
                    img.width === image_settings.width && 
                    img.height === image_settings.height
        )[0];
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
    container.find("description-section").append(
        $("<p>").addClass("info").text(response.info)
    )

    if(response.pleaseNote){
        container.find("description-section").append(
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