import React, {useState} from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
  const [pokemonNameFromSearchBar, setPokemonFromSearchBar] = useState(``);
  
  const handleChange = (e) => {
    setPokemonFromSearchBar(e.target.value)
  }

  const handleSearchBarSubmit = (event) => {
    event.preventDefault()
    // console.log(`pokemon Name from Search Bar: ${pokemonNameFromSearchBar}`)
    props.setPokemonToSearch(pokemonNameFromSearchBar)
  }

  return (
    <div>
        <form onSubmit={handleSearchBarSubmit}>
          <input type = "text" id = "searchBarTextField" placeholder="Search ..." onChange={handleChange}></input>
          <button type="submit">Search</button>
        </form>
    </div>
  );
}

export default SearchBar;
