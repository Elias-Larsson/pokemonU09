import type { PokemonData } from "./types/pokemondata";

type Props = {
  pokemon: PokemonData;
};

export const UserPokemon = ({ pokemon }: Props) => {
  if (!pokemon) return <div>No Pokémon found.</div>;
  return (
    <div className="bg-white m-4">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
        <p>health: {pokemon.stats[0].base_stat} </p>
    </div>
  );
};
