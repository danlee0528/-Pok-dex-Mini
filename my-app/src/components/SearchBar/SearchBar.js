import React, {useEffect, useState} from 'react';
import './SearchBar.css';
import axios from 'axios';


const SearchBar = (props) => {
  const [exsitingPokemonNames, setExistingPokemonNames] = useState(null)
  const [pokemonNameFromTextField, setPokemonNameFromTextField] = useState("")
  const [pokemonCount, setPokemonCount] = useState(null)
  const [pokemonNameOptions, setPokemonNameOptions] = useState(null)
  const [pokemonNameOptionOpened, setPokemonNameOptionOpened] = useState(false)

  const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon`
  const pokemonNamesUrlWithCount = (count) => { 
    return "https://pokeapi.co/api/v2/pokemon?limit=" + count 
  } 
  const foundMatchingPokemonFromDB = (pokemonName) =>{ 
    return exsitingPokemonNames.includes(pokemonName.toLowerCase()) 
  }

  const getMatchingOptionsByLengthAndName = (length, pokemonName) => {
    return exsitingPokemonNames.filter(name => name.slice(0,length) === pokemonName.toLowerCase())
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

  // DONE
  const handleSearchBarSubmit = (event) => {
    event.preventDefault()
    let pokemonName = "";

    // Handle edge cases such as rattata vs rattata-alola being fetched together with rattata
    if (foundMatchingPokemonFromDB(pokemonNameFromTextField)){
      pokemonName = JSON.parse(JSON.stringify(pokemonNameFromTextField))      
      setPokemonNameFromTextField(pokemonName)
      props.setPokemonNameToSearch(pokemonName)
      props.setPokemonNameToSearchFound(true)
    }else{
      props.setPokemonNameToSearch("")
      props.setPokemonNameToSearchFound(false)
    }

    setPokemonNameOptionOpened(true) //hide options
  }

  const handleSearchBarReset = (event) => {
    event.preventDefault()
    setPokemonNameFromTextField("")
    setPokemonNameOptionOpened(true) //reinitialize
    props.setPokemonNameToSearch(props.pokemonNames)
    props.setPokemonNameToSearchFound(true) 
  }

  const handleTextFieldChange = (e) => {
    let input = e.target.value
    let userPokemonNames = getMatchingOptionsByLengthAndName(input.length, input)

    setPokemonNameFromTextField(input.toLowerCase())

    if (input.length > 0){
      setPokemonNameOptions(userPokemonNames)
      setPokemonNameOptionOpened(false)
    }else{
      setPokemonNameOptionOpened(true)
    }
  }


  // Options only show pokemon names in the database in the first place, just return the selected option (string)
  const handlePokemonOptionClick = (e) => {
    let userPokemonName = e.target.value
    setPokemonNameFromTextField(userPokemonName)
    setPokemonNameOptions(userPokemonName)
    setPokemonNameOptionOpened(true)
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
                value={pokemonNameFromTextField}
              />
              <div className="pokemonNameOptionsContainer">
                {pokemonNameOptions && !pokemonNameOptionOpened ? 
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
            <input type="submit" onClick = {handleSearchBarReset} value="Reset"/>
          </div>
        </form>
    </div>
  );
}

export default SearchBar;
