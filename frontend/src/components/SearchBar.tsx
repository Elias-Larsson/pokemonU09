import { useEffect, useState } from "react";
import { getPokemons, GET_POKEMONS } from "../api/pokemonApi";

interface PokemonItem {
  name: string;
  url: string;
}

interface Props {
  onSelect: (pokemonName: string) => void;
}

export default function SearchBar({ onSelect }: Props) {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getPokemons(GET_POKEMONS).then(({ data }) => {
      setPokemonList(data.results);
    });
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        className="border p-2 rounded w-60 bg-orange-50 text-black"
        placeholder="Search Pokémon..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        list="pokemon-options"
      />
      <datalist id="pokemon-options">
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name} />
        ))}
      </datalist>
      <button
        onClick={() => onSelect(inputValue)}
        className="bg-primary-yellow text-black px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
