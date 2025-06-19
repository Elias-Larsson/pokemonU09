import type { PokemonData } from "../types/pokemondata";

type Props = {
  pokemon: PokemonData;
  hp: number;
};

export const RenderLifeBar = ({ pokemon, hp }: Props) => {
  const maxHp = pokemon.stats[0].base_stat;
  const widthPercentage = (hp / maxHp) * 100;
  if (!pokemon) return <div>No Pokemon found.</div>;
  return (
    <div className="bg-white w-16 h-4 border-2">
      <div
        className="bg-green-400"
        style={{ width: `${widthPercentage}%`, height: "100%" }}
      ></div>
    </div>
  );
};
