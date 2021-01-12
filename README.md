# Mini Pokedex App

## To run this program
1. Go to '''./my-app''' and run '''npm install -i''' to install packages
2. Run '''npm start''' and the project will be running at https://localhost:3000

## Requirements
- [x] Pokemon API to use: https://pokeapi.co/
- [x] The app should be built in ReactJS. You can use a styling library like Emotion
- [x] The user should be able to search for a pokemon and get a "card" filled with info about that pokemon: name, height, weight, types, abilities and base stats (hp/atk/def/special-atk/special-def/speed)
- [x] The card should have at least one picture/sprite of the pokemon
- [] Stage the app on a live url
- [] Responsive Design

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

## Possible Improvments
- If you were to establish connection to a server, consider having a default image for 404 error
    - React prototypes can set default images for any network error
- If the project is expected to grow, consider using Redux store to improve performance
    - Pokemon API contains endpoints whose data are nested that may need additional querying to other endpoints to retrieve information in need
- Card component can be futher organized with micro components if needed
