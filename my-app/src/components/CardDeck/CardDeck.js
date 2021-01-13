import React, {} from 'react';
import Card from './Card/Card';
import './CardDeck.css';

// Received an array of pokemon names and urls
const CardDeck = props => {
    return (
      <div className="cardDeck">
            {typeof props.pokemonNameToSearch === "object" && props.pokemonNameToSearch.map(name => { return (<Card key = {name} name = {name}/> )})}
            {typeof props.pokemonNameToSearch === "string" && <Card key = {props.pokemonNameToSearch} name = {props.pokemonNameToSearch}/>}
      </div>
    );
}

export default CardDeck;
