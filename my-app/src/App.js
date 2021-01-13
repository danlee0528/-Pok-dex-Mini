import React, {useState, useEffect} from 'react'
import './App.css'
import CardDeck from './components/CardDeck/CardDeck'
import SearchBar from './components/SearchBar/SearchBar'
import axios from 'axios'
import ErrorPage from './components/ErrorPage/ErrorPage'


const App = () => {
  const pokemonRandomMonsterUrl = `https://pokeapi.co/api/v2/pokemon?limit=2`
  const [pokemonNames, setPokemonNames] = useState(null)
  const [pokemonNameToSearch, setPokemonNameToSearch] = useState([])
  const [pokemonNameToSearchFound, setPokemonNameToSearchFound] = useState(false)


  useEffect(()=>{
    axios(pokemonRandomMonsterUrl)
      .catch(err => console.err(err))
      .then(res => {  
        let names = []
        let urls = []

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
          pokemonNameToSearch = {pokemonNameToSearch}
          setPokemonNameToSearch = {setPokemonNameToSearch}
          setPokemonNameToSearchFound = {setPokemonNameToSearchFound}
        />
        {/* Default */}
        {pokemonNameToSearch && pokemonNames && pokemonNameToSearchFound &&
          typeof pokemonNameToSearch === "object" && <CardDeck pokemonNameToSearch ={pokemonNames} pokemonNameToSearchFound = {pokemonNameToSearchFound}/>
        }

        {/* Reset Button Clicked */}
        {pokemonNameToSearch && pokemonNames && !pokemonNameToSearchFound &&
          typeof pokemonNameToSearch === "object" && <CardDeck pokemonNameToSearch ={pokemonNames} pokemonNameToSearchFound = {pokemonNameToSearchFound}/>
        }
        
        {/* Valid Submission */}
        {pokemonNameToSearch && pokemonNames && pokemonNameToSearchFound &&
          typeof pokemonNameToSearch === "string"
          && <CardDeck pokemonNameToSearch ={pokemonNameToSearch} pokemonNameToSearchFound = {pokemonNameToSearchFound}/>
        }

        {/* Invalid Submission */}
        {pokemonNameToSearch && pokemonNames && !pokemonNameToSearchFound &&
          typeof pokemonNameToSearch === "string" && <ErrorPage />
        }
        
    </div>
  );
}
export default App;
