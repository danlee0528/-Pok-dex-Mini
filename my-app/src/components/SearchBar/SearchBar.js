import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div>
        <form action = "">
          <input type = "text" id = "searchBarTextField" placeholder="Search ..."></input>
          <button type="submit">Search</button>
        </form>
    </div>
  );
}

export default SearchBar;
