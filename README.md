# Mini Pokedex App
- A simple Pokedex app that allows the user to query pokemons by their names or ids.

## To run this program locally
1. Go to '''./my-app''' and run '''npm install -i''' to install packages
2. Run '''npm start''' and the project will be running at https://localhost:3000

## Demo
 - [WebSite](https://freewebhosting-bda42.web.app/)

### Screenshots
<img src="./src/assets/pokedex-main.PNG" alt="pokedex-card-inactive"/>
<img src="./src/assets/pokedex-card-inactive.PNG" alt="pokedex-card-inactive"/>
<img src="./src/assets/pokedex-card-active.PNG" alt="pokedex-card-active"/>

## Features
- [x] Match the pokemon type with the style of the card: red/green, etc.
- [x] Style the pokemon stats
- [x] Show/click through all the spirtes of each pokemon, instead of just showing one
- [x] Display a few random pokemon upon loading before the user searches anything
- [x] Implement auto-complete options for possible pokemon matches as the user types their query
- [x] Use git to keep track of your progress with good commit messages throughout development

## Technologies
- Chart.js
- React.js

## Component Trees
- App
    - SpinningWheel
    - ErrorPage
    - SearchBar
    - CardDeck
        - Card

## Requirements
- [x] Pokemon API to use: https://pokeapi.co/
- [x] The app should be built in ReactJS. You can use a styling library like Emotion
- [x] The user should be able to search for a pokemon and get a "card" filled with info about that pokemon: name, height, weight, types, abilities and base stats (hp/atk/def/special-atk/special-def/speed)
- [x] The card should have at least one picture/sprite of the pokemon
- [x] Stage the app on a live url
- [x] Responsive Design

## Process
### 1. Ideating Stage
- Before developing the application, I needed to understand the context of Pokemon at present. The last time I watched & played pokemon takes place in 2000. Therefore, I first examined the structures and data of the Pokemon API. Then, I moved onto creating a mokeup of my application, organize the application by components, and ideated interactions such as event listener, page navigation and so forth.

### 2. Coding Stage
- While writing the code, I faced two major decisions such as wheter to use React's built-in Fetch API or Axios Library. I chose Axios because fetch doesn't support some browsers, Axios support more parameter options and automatically transform response into JSON. The second major decision was the decision on the location of Axios calls to request data from he Pokemon API. To fulfill the requirement of this project, I had to use multiple endpoints to retrieve necessary data and update states accordingly. Placing these requests in a single component could slow down rendering and even re-render components multiple times. So, I split API calls into different components in a top-down fashion. 

### 3. Refacotring Stage
- Commnets used for testing were removed. Names of variables including functions and components were reviewed. I tried to identity any repetitive part of the code because such code can be refactored to use a function.


## Possible Improvments
- If there is a need to establish connection to a server, consider having a default image for 404 error.
    - React prototypes can set default images for any network error.
- If the project is expected to grow, consider using Redux store to improve performance.
    - Pokemon API contains endpoints whose data are nested that may need additional querying to other endpoints to retrieve information in need.
- Card component can be futher organized with micro components if needed.
- To increase accessibility, convert text units to "rem".
- If Radar chart looks skewed, consider removing "weight" property from dataset.
