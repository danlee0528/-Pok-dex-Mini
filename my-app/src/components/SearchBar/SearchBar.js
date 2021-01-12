import React, {useEffect, useState} from 'react';
import './SearchBar.css';
import axios from 'axios';


const SearchBar = (props) => {
  const [userPokemonNameToSearch, setUserPokemonNameToSearch] = useState("")
  const [pokemonCount, setPokemonCount] = useState(null)
  const [exsitingPokemonNames, setExistingPokemonNames] = useState(null)
  const [pokemonNameOptions, setPokemonNameOptions] = useState(null)
  const [pokemonNameOptionClicked, setPokemonNameOptionClicked] = useState(false)

  const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon`
  const pokemonNamesUrlWithCount = (count) =>{
    return "https://pokeapi.co/api/v2/pokemon?limit=" + count;
  } 

  useEffect(()=>{
    (async() => {
      const pokemonCount = await axios(pokemonApiUrl)
      .catch(err => console.error(err))
      .then(res => {
        setPokemonCount(res.data.count) 
          return res.data.count
        })
      
        await axios(pokemonNamesUrlWithCount(pokemonCount))
        .catch(err => console.error(err))
        .then(res => {
          const pokemonNamesFromDB = Object.values(res.data.results).map(key => key.name)
          setExistingPokemonNames(pokemonNamesFromDB)
        })  
    })()
  },[pokemonApiUrl])

  // lift state (a single pokemon name) up to App component
  const handleSearchBarSubmit = (event) => {
    event.preventDefault()
    props.setPokemonToSearch(userPokemonNameToSearch.toLowerCase())
  }

  const handleTextFieldChange = (e) => {
    let userPokemonName = e.target.value
    // console.log(userPokemonName)
    setUserPokemonNameToSearch(userPokemonName)
    const matchingPokemons = exsitingPokemonNames.filter(name =>  name.substring(0,userPokemonName.length) === userPokemonName)
    // console.log(matchingPokemons)
    setPokemonNameOptions(matchingPokemons)
  }

  const handlePokemonOptionClick = (e) => {
    console.log(`Set Search Bar Value to ${e.target.value}`)
    setUserPokemonNameToSearch(e.target.value)
    setPokemonNameOptionClicked(!pokemonNameOptionClicked)
  }


  return (
    pokemonCount && exsitingPokemonNames && <div className="seaerchBarCotnainer">
        <form className="autocomplete" onSubmit = {handleSearchBarSubmit}>
            <input 
              type = "text" 
              id = "searchBarTextField" 
              placeholder="Enter a pokemon name or id..." 
              onChange={handleTextFieldChange}
              value={userPokemonNameToSearch}
            />
            <div className="pokemonNameOptionsContainer">
              {pokemonNameOptions && !pokemonNameOptionClicked? 
                pokemonNameOptions.map(name => {
                  return <option 
                            onClick={handlePokemonOptionClick} 
                            className="pokemonNameOptions" 
                            key={name} 
                            value={name}>
                              {name}
                          </option>
                })
                : null
              }
            </div>

          <button type="submit">Search</button>
        </form>
    </div>
  );
}





export default SearchBar;
