import React, {useState, useEffect} from 'react';
import './App.css';
import CardDeck from './components/CardDeck/CardDeck'


const pokemonRandomMonsterUrl = `https://pokeapi.co/api/v2/pokemon?limit=20`

const App = () => {
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
        // console.log(names,urls)
        setPokemonNames(names)
        setPokemonUrls(urls)
      })
  },[])

  return(
    <div>
      {}
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
