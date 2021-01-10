import React from 'react';
import './App.css';
import CardDeck from './components/CardDeck/CardDeck';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  return (
    <div className="App">
      <SearchBar />
      <CardDeck />
    </div>
  );
}

export default App;
