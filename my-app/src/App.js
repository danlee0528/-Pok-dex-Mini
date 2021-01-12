import React, {useState, useEffect} from 'react';
import './App.css';
import CardDeck from './components/CardDeck/CardDeck'
import SearchBar from './components/SearchBar/SearchBar'
import axios from 'axios';

const App = () => {
  const pokemonRandomMonsterUrl = `https://pokeapi.co/api/v2/pokemon?limit=20`
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemonUrls, setPokemonUrls] = useState([]);
  const [pokemonToSearch, setPokemonToSearch] = useState("");

  const pokemonToSearchUrl = (pokemonName) => {
    return [`https://pokeapi.co/api/v2/pokemon/${pokemonName}`]
  };

  useEffect(()=>{
    axios(pokemonRandomMonsterUrl)
      .catch(err => console.err(err))
      .then(res => {  
        let names = [];
        let urls = [];

        for(let i=0; i< res.data.results.length; ++i){
          names.push(res.data.results[i].name)
          urls.push(res.data.results[i].url)
        }

        setPokemonNames(names)
        setPokemonUrls(urls)
      })
  },[pokemonRandomMonsterUrl])

  return(
    <div>
        <SearchBar 
          pokemonToSearch = {pokemonToSearch}
          setPokemonToSearch = {setPokemonToSearch}
        />
        {pokemonToSearch ? <CardDeck pokemonNames = {[pokemonToSearch]} pokemonUrls = {pokemonToSearchUrl}/> 
          : pokemonNames && pokemonUrls &&
            <CardDeck
              pokemonNames = {pokemonNames}
              pokemonUrls = {pokemonUrls}
            />
        }
    </div>
  );
}
export default App;
