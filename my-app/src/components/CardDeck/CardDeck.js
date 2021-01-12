import React, {} from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';
import Card from './Card/Card';
import './CardDeck.css';

// Received an array of pokemon names and urls
const CardDeck = props => {
  console.log(`CardDeck/pokemonNames: ${props.pokemonNames}, Type: ${typeof props.pokemonNames}`)
  console.log(`CarDeck/pokemonNameToSearchFound: ${props.pokemonNameToSearchFound}, Type: ${typeof props.pokemonNameToSearchFound}`)
  
    return (
      <div className="cardDeck">
            {
              typeof props.pokemonNames === "object" && props.pokemonNameToSearchFound && props.pokemonNames.map(name => { return (<Card key = {name} name = {name}/> )})
            }
            {
                typeof props.pokemonNames === "string" ? 
                  props.pokemonNameToSearchFound ?
                   <Card key={props.pokemonNames} name={props.pokemonNames} /> 
                  :<ErrorPage />
                :<ErrorPage />
            }
      </div>
    );
}

export default CardDeck;
