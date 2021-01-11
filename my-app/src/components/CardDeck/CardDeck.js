import React from 'react';
import Card from './Card/Card';
import './CardDeck.css';

const CardDeck = () => {
    const pokemons = ["bulbasaur", "blastoise", "metapod"];

  return (
    <div className = "cardDeck">
      <Card pokemon={pokemons[0]} />
      <Card pokemon={pokemons[1]} />
      <Card pokemon={pokemons[2]} />
    </div>
  );
}

export default CardDeck;
