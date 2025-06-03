import { useState } from "react";
import SearchBar from "../components/SearchBar";
import PokemonDetails from "../components/PokemonDetails";
import { getPokemons, URL } from "../api/pokemonApi";

export const PokeSearch = ()=> {
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

  const handleSearch = (pokemonName: string) => {
    getPokemons(`${URL}/${pokemonName.toLowerCase()}`)
      .then(({ data }) => setSelectedPokemon(data))
      .catch(() => alert("Pokémon not found"));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-center h-screen justify-items-start bg-[url('/homebackground.png')]">
      <h1 className="text-3xl font-bold mb-6 bg">Pokémon Search</h1>
      <SearchBar onSelect={handleSearch} />
      <PokemonDetails pokemon={selectedPokemon} />
    </div>
  );
}

