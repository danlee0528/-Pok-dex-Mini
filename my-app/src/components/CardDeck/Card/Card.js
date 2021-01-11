import React, { useEffect, useState } from 'react';
import './Card.css';
import { Bar } from 'react-chartjs-2';


const Card = props => {
  const NUM_OF_DEFAULT_BASIC_SPRITE_IMAGE_SIZE = 8;
  const pokemonMonsterUrl = `https://pokeapi.co/api/v2/pokemon/${props.name}`
  const [pokemonData, setPokemonData] = useState(null)
  const [spriteImageUrls, setSpriteImageUrls] = useState([])
  const [viewSprites, setViewSprites] = useState(false);
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

  
  useEffect(()=>{
    fetch(pokemonMonsterUrl)
      .catch(err => console.error(err))
      .then(res => res.json())
      .then(res => {
        const spriteUrls = Object.values(res.sprites).slice(0,NUM_OF_DEFAULT_BASIC_SPRITE_IMAGE_SIZE)
          .map(currentSpriteUrl => currentSpriteUrl)
          .filter(url => url !== null)
          .reverse()
          setSpriteImageUrls(spriteUrls)
        setPokemonData(res)
      })
  },[pokemonMonsterUrl])


  const handleViewSpriteOpenBtn = () => {
    setViewSprites(true)
  }

  const handleViewSpriteCloseBtn = () => {
    setViewSprites(false)
  }

  return (
    pokemonData && <div>
      <div className = "card">
        <div className = "cardTitle">{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</div>
        
        <div className = "cardTypes cardProperties">
              <span>{pokemonData.types.map((type, index) => <span key = {index} style={{"backgroundColor": `${typeColoursDict[type.type.name]}`}} className = "cardTypeTags">{type.type.name}</span>)}</span>
        </div>

        <div className="cardImageContainer cardProperties">
          <img id = "cardPokemonImage" alt = "pokemonImage" src={pokemonData.sprites.other["official-artwork"].front_default} />
        </div>

        <div id ="cardChartContainer">
          <Bar
            data={
              {
                labels: pokemonData.stats.map(currentStat => currentStat.stat.name),
                datasets: [{ 
                  data: pokemonData.stats.map(currentStat =>currentStat.base_stat),
                  backgroundColor: `#BCE0EE`,
                }],
            }}
            options={
              { 
                title:{
                  display: false,
                  text: "Stats",
                  fontSize: 12
                },
                legend:{
                  display: false,
                },
                maintainAspectRatio: false,
                responsive: true,
                aspectRatio: 1,
              }
            }
          />
        </div>
        
        <div className="cardProperties">height: {pokemonData.height}, weight: {pokemonData.weight}</div>
        
        <div className = "cardAbilities cardProperties">
            abilities: <span>{pokemonData.abilities.map((currentAbility,index, arr) => 
            index === arr.length-1 ? <span key = {index}>{currentAbility.ability.name}</span>
            :<span key = {index}>{currentAbility.ability.name}, </span>)}
            </span>
        </div>

        <button onClick={handleViewSpriteOpenBtn}>View Sprites</button>
        {viewSprites && spriteImageUrls? <div className="cardSpriteImagesContainer">
          <div className = "cardProperties">
              {spriteImageUrls.map(url => {
                return <img className = "cardSpriteImages" key = {url} alt = {url} src={url} />
              })}
          </div> 
          <button onClick={handleViewSpriteCloseBtn}>Hide Sprites</button>
        </div>: null}
    </div>
  </div>
  );
};

export default Card;