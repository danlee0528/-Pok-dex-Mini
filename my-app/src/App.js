import React, {useState, useEffect} from 'react';
import './App.css';
import CardDeck from './components/CardDeck/CardDeck'
import SearchBar from './components/SearchBar/SearchBar'
import axios from 'axios';
import ErrorPage from './components/ErrorPage/ErrorPage';

const App = () => {
  const pokemonRandomMonsterUrl = `https://pokeapi.co/api/v2/pokemon?limit=20`
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemonToSearch, setPokemonToSearch] = useState("");
  const [pokemonDataFromSearchReady, setPokemonDataFromSearchReady] = useState(false);
  const STRING_TYPE = "string"

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
          pokemonToSearch = {pokemonToSearch}
          setPokemonToSearch = {setPokemonToSearch}
          setPokemonDataFromSearchReady = {setPokemonDataFromSearchReady}
        />

        {/* Show Default Pokemons */}
        {!pokemonDataFromSearchReady && <CardDeck pokemonNames = {pokemonNames}/> } 

        {/* 
          If the user clicks submit button ofthe SearchBar without selecting an option, a string is returned 
          Result can any string. Thus, check if the pokemon name string exists in the database before passing state down 
        */}
        {pokemonDataFromSearchReady && typeof pokemonToSearch === STRING_TYPE && 
          pokemonNames.includes(pokemonToSearch) && <CardDeck pokemonNames = {[pokemonToSearch]}/>}  
        
        {/* If the user clicks reset button of the SearchBar or select an option, an object is returend */}
        {pokemonDataFromSearchReady && typeof pokemonToSearch !== STRING_TYPE && <CardDeck pokemonNames = {pokemonToSearch}/>}

        {/* If the user looks for non existential pokemon */}
        {pokemonDataFromSearchReady && typeof pokemonToSearch === STRING_TYPE && 
          !pokemonNames.includes(pokemonToSearch) && <ErrorPage/>}  
        
    </div>
  );
}
export default App;
