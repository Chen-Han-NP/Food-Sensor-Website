## ID Assignment 2 - Food Sensor Website
## GitHub Page Link: https://chen-han-np.github.io/Food-Sensor-Website/

<img width="1440" alt="Screenshot 2022-12-15 at 11 34 25 AM" src="https://user-images.githubusercontent.com/73086331/207766448-f40b7047-2933-4c62-a76c-d4c4c48299ca.png">

## Description:
Food Sensor is a website that calls on Mapbox API and in-built HTML API that allow the user to locate their
current location and display all the restaurants nearby the user's current location. 
The user can choose to use the "Get my Location" button to automatically locate his/her 
current position upon allowing the website the get the address,
or manually type the location in the search bar on the top right corner.

Either way, the website will generate another button next to the "Get my Location" button that shows
how many restaurants are nearby (max. 10 due to free version of API).

Once the user click on the new button, a sidebar will pop out from the right side of the screen, showing
the nearest (max. 10) restaurants with their name, description, distance, estimated walking time and address stating.
The restaurants shown are arranged according to the distance travelled.

Next, the user are free to choose which restaurant to visit, and click on the name of the restaurant,
the sidebar will be closed and the map will show a fastest route to get to the restaurant together with marker
and popup stating the location of the restaurant on the map.

Users are free to navigate between restaurants.


## Design Process

This website is designed specially for people who are in a new and unfamiliar environment and not sure
what are the restaurants nearby to visit during their meal time.
It hopes to get the user to a dining area as soon as possible using effective API and responsive GUI.
 

## Features 
### Existing Features
- Feature 1 - Display a map on the screen.
- Feature 2 - Allows the user to locate their current position(with marker) by clicking the 'Get my location' button.
- Feature 3 - Allows the user to choose up to 10 restaurants nearby their current position
- Feature 4 - If the user is uncomfortable of sharing his/her current position/"Get my Location" button didn't work, he/she can manually type in the search bar and the results shown will be the same as using the button.
- Feature 5 - Allows the user to switch between day mode and night mode for better UI experience.

## Technologies Used

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation. 

- [Bootstrap] (https://getbootstrap.com)
    - The project uses **Bootstrap** to build fast and responsive site.

- [MapboxAPI] (https://docs.mapbox.com/api/overview/)
    - The project uses **MapBoxAPI** for retreiving nearest stores information and calculating the fastest route.


