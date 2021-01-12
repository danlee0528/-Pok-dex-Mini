import React, {useState, useEffect} from 'react';
import './App.css';
import CardDeck from './components/CardDeck/CardDeck'
import SearchBar from './components/SearchBar/SearchBar'
import axios from 'axios';


const App = () => {
  const pokemonRandomMonsterUrl = `https://pokeapi.co/api/v2/pokemon?limit=20`
  const [pokemonNames, setPokemonNames] = useState(null);
  const [pokemonNameToSearch, setPokemonNameToSearch] = useState(null);
  const [pokemonNameToSearchFound, setPokemonNameToSearchFound] = useState(true);
  
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
      })
  },[pokemonRandomMonsterUrl])

  return(
    <div>
        <SearchBar 
          pokemonNames = {pokemonNames}
          setPokemonNameToSearch = {setPokemonNameToSearch}
          setPokemonNameToSearchFound = {setPokemonNameToSearchFound}
        />
        {
          pokemonNames ?
            pokemonNameToSearch && (typeof pokemonNameToSearch === "string" ||  typeof pokemonNameToSearch === "object" )?
            <CardDeck pokemonNames = {pokemonNameToSearch} pokemonNamesExisting ={pokemonNames} pokemonNameToSearchFound = {pokemonNameToSearchFound}/>
            :<CardDeck pokemonNames = {pokemonNames} pokemonNamesExisting ={pokemonNames} pokemonNameToSearchFound = {pokemonNameToSearchFound}/> 
          :null
        }
    </div>
  );
}
export default App;
