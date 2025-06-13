import type { PokemonData } from "./types/pokemondata";

type Props = {
  pokemon: PokemonData;
  bgColor: string;
};

export const UserPokemon = ({ pokemon, bgColor}: Props) => {
  if (!pokemon) return <div>No Pokémon found.</div>;
  return (
    <div className={`flex flex-col ${bgColor} m-4 cursor-pointer border-b-3 border-r-3 border-zinc-600`}>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
        <p>health: {pokemon.stats[0].base_stat} </p>
    </div>
  );
};
