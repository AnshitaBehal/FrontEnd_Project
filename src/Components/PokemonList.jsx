import React, { useState, useEffect } from "react";

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(currentPageUrl);
      const data = await response.json();
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
      setPokemonData(data.results);
      setLoading(false);
    }
    fetchData();
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function handlePokemonClick(pokemon) {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  }

  function closeModal() {
    setSelectedPokemon(null);
    setShowModal(false);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-10">
        {pokemonData.map((pokemon) => (
          <div
            key={pokemon.name}
            className="bg-gray-100 p-4 rounded-lg shadow-lg w-128 cursor-pointer hover:scale-105 duration-500"
            onClick={() => handlePokemonClick(pokemon)}
          >
            <PokemonCard url={pokemon.url} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={goToPrevPage} className="text-center">
          Previous
        </button>
        <button onClick={goToNextPage}>Next</button>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-4">
              <div className="text-lg font-bold">{selectedPokemon.name}</div>
              <div className="text-gray-500">ID: {selectedPokemon.id}</div>
              <div className="text-gray-500">
                Types:{" "}
                {selectedPokemon.types
                  .map((type) => type.type.name)
                  .join(", ")}
              </div>
              <div className="text-gray-500">
                Weight: {selectedPokemon.weight}
              </div>
            </div>
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              className="w-full h-auto"
            />
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

function PokemonCard({ url }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setPokemon(data);
    }
    fetchData();
  }, [url]);

  if (!pokemon) return null;

  const { id, name, types, weight, sprites } = pokemon;

  return (
    <>
      <div className="text-lg font-bold">{name}</div>
      <div className="text-gray-500">ID: {id}</div>
      <div className="text-gray-500">
        Types: {types.map((type) => type.type.name).join(", ")}
      </div>
      <div className="text-gray-500">Weight: {weight}</div>
      <img src={sprites.front_default} alt={name} className="w-full h-auto" />
    </>
  );
}
export default PokemonList;
