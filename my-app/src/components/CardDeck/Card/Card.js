import React, { useEffect, useState } from 'react';
import './Card.css';

const Card = (props) => {
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonColor, setPokemonColor] = useState(null);

    useEffect(() => {
        (async() => {
            await fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`)
                    .catch(err => console.error(err))
                    .then(res => res.json())
                    .then(res => setPokemonData(res));
            await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.pokemon}/`)
                    .catch(err => console.error(err))
                    .then (res => res.json())
                    .then(res => setPokemonColor(res.color));
        })()
    },[props.pokemon]);

  return (
      pokemonData && pokemonColor ? <div>
          <p>ID: {pokemonData.id}</p>
          <p>Name: {pokemonData.name}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Height: {pokemonData.height}</p>
          <p>Color: {pokemonColor.name}</p>

          <div className = "types">
            {pokemonData.types.map((type,index) => <p key = {index}>{type.name}</p>)}
          </div>

          <div className = "abilities">
            {pokemonData.abilities.map((ability,index) => <p key = {index}>{ability.name}</p>)}
          </div>

          <div className = "stats">
            {pokemonData.stats.map((currentStat,index) => (
                <p key = {index}>
                    {currentStat.stat.name}: {currentStat.base_stat}
                </p>
            ))}
          </div>

          <div className = "sprites">
            {pokemonData.sprites.front_default && <img alt="front_default" src={pokemonData.sprites.front_default}/>}
            {pokemonData.sprites.back_default && <img alt="back_default" src={pokemonData.sprites.back_default}/>}
            {pokemonData.sprites.front_female && <img alt="front_female" src={pokemonData.sprites.front_female}/>}
            {pokemonData.sprites.back_female && <img alt="back_female" src={pokemonData.sprites.back_female }/>}
            {pokemonData.sprites.front_shiny && <img alt="front_shiny" src={pokemonData.sprites.front_shiny}/>}
            {pokemonData.sprites.back_shiny && <img alt="back_shiny" src={pokemonData.sprites.back_shiny}/>}
            {pokemonData.sprites.front_shiny_female && <img alt="front_shiny_female" src={pokemonData.sprites.front_shiny_female}/>}
            {pokemonData.sprites.back_shiny_female && <img alt="back_shiny_female" src={pokemonData.sprites.back_shiny_female}/>}
          </div>
      </div>: null
  );
}

export default Card;
