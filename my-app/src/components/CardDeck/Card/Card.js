import React, { useEffect, useState } from 'react';
import './Card.css';
// import { Radar } from 'react-chartjs-2';


const Card = props => {
    const pokemonMonsterApiUrl = `https://pokeapi.co/api/v2/pokemon/${props.pokemon}`
    const [pokemonData, setPokemonData] = useState(null)
    const [pokemonTypeNames, setPokemonTypeNames] = useState(null)

    const typeColoursDict = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    };

    useEffect(() => {
      Promise.all([
        fetch(pokemonMonsterApiUrl)
      ]).then(
        responses => Promise.all(responses.map(response => response.json())) 
      ).then(
        results => {
          setPokemonTypeNames(results[0].types.map(currentIndex => currentIndex.type.name))
          setPokemonData(results[0])
        }
      )
    }, [pokemonMonsterApiUrl])


    return (
      pokemonData && pokemonTypeNames? 
        <div className = "card">
          <div className = "cardSprites">
            {pokemonData.sprites.front_default && <img alt="front_default" src={pokemonData.sprites.front_default}/>}
          </div>

          <div className = "cardTitle">{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</div>
          
          <div className = "cardTypes cardProperties">
                <span>{pokemonData.types.map((type, index) => <span key = {index} style={{"backgroundColor": `${typeColoursDict[type.type.name]}`}} className = "cardTypeTags">{type.type.name}</span>)}</span>
          </div>

          <div className = "cardStats cardProperties">
                {pokemonData.stats.map((currentStat,index, arr) => <div key = {index}>{currentStat.stat.name}: {currentStat.base_stat}</div>)}
          </div>
        
          <div className = "cardProperties" >weight: {pokemonData.weight} </div>
          <div className = "cardProperties" >height: {pokemonData.height} </div>  
  
          
          <div className = "cardAbilities cardProperties">
              abilities: <span>{pokemonData.abilities.map((currentAbility,index, arr) => 
              index === arr.length-1 ? <span key = {index}>{currentAbility.ability.name}</span>
              :<span key = {index}>{currentAbility.ability.name}, </span>)}
              </span>
          </div> 
        </div>: null


    // {pokemonData.sprites.back_default && <img alt="back_default" src={pokemonData.sprites.back_default}/>}
    // {pokemonData.sprites.front_female && <img alt="front_female" src={pokemonData.sprites.front_female}/>}
    // {pokemonData.sprites.back_female && <img alt="back_female" src={pokemonData.sprites.back_female }/>}
    // {pokemonData.sprites.front_shiny && <img alt="front_shiny" src={pokemonData.sprites.front_shiny}/>}
    // {pokemonData.sprites.back_shiny && <img alt="back_shiny" src={pokemonData.sprites.back_shiny}/>}
    // {pokemonData.sprites.front_shiny_female && <img alt="front_shiny_female" src={pokemonData.sprites.front_shiny_female}/>}
    // {pokemonData.sprites.back_shiny_female && <img alt="back_shiny_female" src={pokemonData.sprites.back_shiny_female}/>}
    );
};

export default Card;