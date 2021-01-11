import React, {useState, useEffect} from 'react';
import './App.css';
import CardDeck from './components/CardDeck/CardDeck'
import SearchBar from './components/SearchBar/SearchBar'


const App = () => {
  const pokemonRandomMonsterUrl = `https://pokeapi.co/api/v2/pokemon?limit=20`
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemonUrls, setPokemonUrls] = useState([]);

  useEffect(()=>{
    fetch(pokemonRandomMonsterUrl)
      .catch(err => console.err(err))
      .then(res => res.json())
      .then(res => {  
        let names = [];
        let urls = [];

        for(let i=0; i< res.results.length; ++i){
          names.push(res.results[i].name)
          urls.push(res.results[i].url)
        }

        setPokemonNames(names)
        setPokemonUrls(urls)
      })
  },[pokemonRandomMonsterUrl])

  return(
    <div>
      <SearchBar />
      {pokemonNames && pokemonUrls &&
        <CardDeck
          pokemonNames = {pokemonNames}
          pokemonUrls = {pokemonUrls}
        />
      }
    </div>
  );
}
export default App;
