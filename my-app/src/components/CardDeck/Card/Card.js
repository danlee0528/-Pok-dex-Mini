import React, { useEffect, useState } from 'react';
import './Card.css';
// import { Radar } from 'react-chartjs-2';


const Card = props => {
    const pokemonColorApiUrl = `https://pokeapi.co/api/v2/pokemon-species/${props.pokemon}` // pokemon {id or name}
    const pokemonMonsterApiUrl = `https://pokeapi.co/api/v2/pokemon/${props.pokemon}`
    const [pokemonData, setPokemonData] = useState(null)
    const [pokemonTypeNames, setPokemonTypeNames] = useState(null)
    const [pokemonColor, setPokemonColor] = useState(null);


    useEffect(() => {
      Promise.all([
        fetch(pokemonMonsterApiUrl),
        fetch(pokemonColorApiUrl)
      ]).then(
        responses => Promise.all(responses.map(response => response.json())) 
      ).then(
        results => {
          setPokemonTypeNames(results[0].types.map(currentIndex => currentIndex.type.name))
          setPokemonColor(results[1].color.name)
          setPokemonData(results[0])
        }
      )
    }, [pokemonMonsterApiUrl, pokemonColorApiUrl])



    return (
      pokemonData && pokemonTypeNames? 
      <div>
        <p>ID: {pokemonData.id}</p>
        <p>Name: {pokemonData.name}</p>
        <p>Weight: {pokemonData.weight}</p>
        <p>Height: {pokemonData.height}</p>  
        <p>Color: {pokemonColor}</p>
        <div className = "cardTypes">
          <p>Types: {pokemonData.types.map((type, index) =>
            index === pokemonData.types.length-1 ? <span key = {index}>{type.type.name}</span>
            : <span key = {index}>{type.type.name}, </span>)}
          </p>
        </div>
        
        <div className = "cardAbilities">
          <p>Abilities: {pokemonData.abilities.map((currentAbility,index, arr) => 
            index === arr.length-1 ? <span key = {index}>{currentAbility.ability.name}</span>
            :<span key = {index}>{currentAbility.ability.name}, </span>)}
          </p>
        </div> 
 
        <div className = "cardStats">
          {pokemonData.stats.map((currentStat,index) => (
              <p key = {index}>
                  {currentStat.stat.name}: {currentStat.base_stat}
              </p>
          ))}
        </div>

        <div className = "cardSprites">
          Sprites:
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
};

export default Card;