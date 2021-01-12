import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.css';
import {Radar} from 'react-chartjs-2';
import SpinningWheel from '../../SpinningWheel/SpinningWheel';


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
    axios(pokemonMonsterUrl)
      .catch(err => {
        console.error(err)
      })
      .then(res => {
        const spriteUrls = Object.values(res.data.sprites).slice(0,NUM_OF_DEFAULT_BASIC_SPRITE_IMAGE_SIZE)
          .map(currentSpriteUrl => currentSpriteUrl)
          .filter(url => url !== null)
          .reverse()
          setSpriteImageUrls(spriteUrls)
          setPokemonData(res.data)
      })
  },[pokemonMonsterUrl])

  const handleViewSpriteBtn = () => {
    setViewSprites(!viewSprites)
  }

  return (
    pokemonData ? <div>
      <div className = "card">
        <div className = "cardTitle">{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</div>
        
        <div className = "cardTypes cardProperties">
              <span>{pokemonData.types.map((type, index) => <span key = {index} style={{"backgroundColor": `${typeColoursDict[type.type.name]}`}} className = "cardTypeTags">{type.type.name}</span>)}</span>
        </div>

        <div className="cardImageContainer cardProperties">
          <img id = "cardPokemonImage" alt = "pokemonImage" src={pokemonData.sprites.other["official-artwork"].front_default} />
        </div>

        <div id ="cardChartContainer">
          <Radar
            data={
              {
                labels: pokemonData.stats.map(currentStat => currentStat.stat.name).concat(["height", "weight"]),
                datasets: [{ 
                  data: pokemonData.stats.map(currentStat =>currentStat.base_stat).concat([pokemonData.height, pokemonData.weight]),
                  backgroundColor: 'rgba(188, 224, 238, 0.4)',
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
        
        <div className = "cardAbilities cardProperties">
            skills: <span>{pokemonData.abilities.map((currentAbility,index, arr) => 
            index === arr.length-1 ? <span key = {index}>{currentAbility.ability.name}</span>
            :<span key = {index}>{currentAbility.ability.name}, </span>)}
            </span>
        </div>

        <button onClick={handleViewSpriteBtn}>View/Hide Sprites</button>
        {
          viewSprites && spriteImageUrls? 
            <div className = "cardSpriteImagesContainer cardProperties">
                {spriteImageUrls.map(url => {
                  return <img className = "cardSpriteImages" key = {url} alt = {url} src={url} />
                })}
            </div>
          :null
        }
      </div>
    </div>
    : <SpinningWheel />
  );
};

export default Card;