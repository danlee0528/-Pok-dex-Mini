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
    setUserPokemonNameToSearch("")
    setPokemonNameOptionClicked(false) // reactivate auto-complete options
    setPokemonNameOptions([])
    props.setPokemonToSearch(props.pokemonNames)
  }

  const handleTextFieldChange = (e) => {
    let userPokemonName = e.target.value
    if (e.target.value === ""){
      setPokemonNameOptionClicked(false)
    }
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
        <form id="searchBarForm">
              <input 
                type = "text" 
                id = "searchBarTextField" 
                placeholder="Enter a pokemon name to search ..." 
                onChange={handleTextFieldChange}
                value={userPokemonNameToSearch}
              />
              <div className="pokemonNameOptionsContainer">
                {pokemonNameOptions && !pokemonNameOptionClicked ? 
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
          <div className="searchBarBtnContainer">
            <input type="submit" onClick = {handleSearchBarSubmit} value="Search"/>
            <input type="submit" onClick = {hanldSearchBarReset} value="Reset"/>
          </div>
        </form>
    </div>
  );
}





export default SearchBar;
