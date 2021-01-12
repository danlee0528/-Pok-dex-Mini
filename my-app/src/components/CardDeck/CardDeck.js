import React, {} from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';
import Card from './Card/Card';
import './CardDeck.css';

// Received an array of pokemon names and urls
const CardDeck = props => {
    // console.log(props.pokemonNames)
    return (
      <div className="cardDeck">
          {
            Array.isArray(props.pokemonNames) ? props.pokemonNames.map(name => {
              return (
                <Card 
                  key = {name}
                  name = {name}
                />
              )
            })
            : <ErrorPage />
          }
      </div>
    );
}

export default CardDeck;
