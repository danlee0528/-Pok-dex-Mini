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


  const handleSearchBarSubmit = (event) => {
    event.preventDefault()
    props.setPokemonToSearch(userPokemonNameToSearch)
  }

  const hanldSearchBarReset = (event) => {
    event.preventDefault()
    props.setsSearchBarResetClicked(true)
    props.setPokemonToSearch(props.pokemonNames)
    setUserPokemonNameToSearch("")
  }

  const handleTextFieldChange = (e) => {
    let userPokemonName = e.target.value
    setUserPokemonNameToSearch(userPokemonName)
    const matchingPokemons = exsitingPokemonNames.filter(name =>  name.substring(0,userPokemonName.length) === userPokemonName)
    setPokemonNameOptions(matchingPokemons)
  }

  const handlePokemonOptionClick = (e) => {
    let name = e.target.value
    // console.log(`Set Search Bar Value to ${name}`)
    const pokemonNames = pokemonNameOptions.filter(option => option.slice(0, name.length) === name)
    setPokemonNameOptions(pokemonNames)
    setUserPokemonNameToSearch(pokemonNames)
    setPokemonNameOptionClicked(!pokemonNameOptionClicked)
  }


return (
  pokemonCount && exsitingPokemonNames && 
    <div className="searchBarContainer">
      <div className="searchBarTextFieldContainer">
        <form>
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
        </form>
      </div>
      <div className="searchBarBtnContainer">
        <button type="submit" onClick = {handleSearchBarSubmit}>Search</button>
        <button type="submit" onClick = {hanldSearchBarReset}>Refresh</button>
      </div>
    </div>
  );
}





export default SearchBar;
