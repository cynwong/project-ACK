# Project 1 - Events + Music

## Project title: ACK application

# Project Links
[Deployed] - https://cynwong.github.io/project-ACK/
[GitHubrepo] - https://github.com/cynwong/project-ACK.git

# Project description

This is  multi-functional application that provides searching service to upcoming concerts.

And also suggest some relevant music in regards to the artists (hits, albums, ...)

The app also displays the count-down time to the event (days, time, etc...)

## User Story
As an user, I can search for concerts by some keywords so I know what will be happening soon. 

As an user, I can search for music so that I can listen to music I like. 

As an user, I should be able to see a count-down so I know how long it will take to the concert. (Google Map)

# Project Structure
* GENERAL SEARCH
    The user will put keywords regrading to what they are looking for into the search bar on the top left of the app and initiate the app by clicking 'Search' or hit Enter.
* ADVANCED SEARCH
    This is a search box on the right hand site of the app. This search box is used when users want to look for something in particular and use these inputs to narrow their scope. Consiting of four inputs: Event kewwords, Genes, City and Country. Initiate the search using 'Search' button or hit Enter, and press 'Cancel' for clearing all input fields.
* DISPLAY BOX   
    This is a display section located below the search bar and displaying successful results in two rows of four. For this particular stage of the project we limit the result to eight by default and save the rest for future developments. Each result will be contained within a card and has a picture, title, date, city and a 'Learn More' button.
    ** LEARN MORE button
        This is a sub-display box for each result. By clicking the 'Learn More' button, users will all details of the event including title, date, city, picture, ticket link, ticket sales dates, venues and map. There will be a 'Favourite' button on top right of each box if users want to add to the 'Count down' list on the top left of the app next to search box.
* COUNTDOWN BOX
    This is a box next to the search box containing the user's favourite events and time count down for each of them. This feature helps users to keep track with their time schedule efficiently.
    
# Future Developments 
* Directions and transport methods to events 
* Time limitation search
* More API extensions such as Eventbrite
* Pagination
* User authetication
