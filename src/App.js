import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import PokemonCard from './Components/PokemonCard';
import PokemonList from './Components/PokemonList';

function App() {
  const [keyword, setKeyword] = useState('');

  return (
    <div>
      <Navbar keyword={keyword} setKeyword={setKeyword} />
      <PokemonCard/> 
      <PokemonList/>
    </div>
  );
}

export default App;
