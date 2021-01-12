import React, {} from 'react';
import Card from './Card/Card';
import './CardDeck.css';

// Received an array of pokemon names and urls
const CardDeck = props => {
    return (
      <div className="cardDeck">
             {props.pokemonNames.map(name => {
                return (
                  <Card 
                    key = {name}
                    name = {name}
                  />
                )
              })
            }
      </div>
    );
}

export default CardDeck;
