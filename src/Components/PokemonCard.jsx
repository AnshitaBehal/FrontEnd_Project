import React, { useState } from 'react';

const PokemonCard = ({ pokemon, onSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!pokemon) {
    return null; // or some other default content
  }

  const { name, id, types, weight } = pokemon || {};

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const openModal = () => {
    setIsModalOpen(true);
    onSelect && onSelect(pokemon);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="mx-auto p-4 flex flex-col justify-center w-full h-full max-w-sm overflow-hidden shadow-lg rounded-lg cursor-pointer"
      onClick={openModal}
      
    >
      <img src={imageUrl} alt={name} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          ID: {id} <br />
          Types: {types.join(', ')} <br />
          Weight: {weight}
        </p>
        {isModalOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50" />
            <div className="bg-white rounded-lg p-4 z-10">
              <div className="flex justify-end">
                <button className="px-2 py-1 bg-gray-700 text-white rounded" onClick={closeModal}>Close</button>
              </div>
              <img src={imageUrl} alt={name} className="w-full mb-4" />
              <div className="font-bold text-xl mb-2">{name}</div>
              <p className="text-gray-700 text-base">
                ID: {id} <br />
                Types: {types.join(', ')} <br />
                Weight: {weight}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
