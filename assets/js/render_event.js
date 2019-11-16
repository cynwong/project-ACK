$(document).ready(function(){
    render_response(response);
    render_response(response);
    render_response(response);
    render_response(response);
    render_response(response);
});


/**
 * Render events for user display. 
 * @param {object} response API response JSON object
 */
function render_response(response){
    const elements = [];

    for(let e of response._embedded.events){
        //render each event
        const event = $(".event.template").clone().removeClass("template");
        const name = e.name;
        event.find(".image img").attr({
            src: e.images[5].url,
            alt: e.name
        });
        event.find(".title").text(name);
        event.find(".content").text(e.info);
        event.find(".datetime time").text(e.dates.start.localDate);
        elements.push(event);
    }
    $("#events-container").append(elements);
}
