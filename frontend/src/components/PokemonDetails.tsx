interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonSprites {
  front_default: string;
}

interface Pokemon {
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
}

interface Props {
  pokemon: Pokemon;
}

export default function PokemonDetails({ pokemon }: Props) {
  if (!pokemon) return null;

  return (
    <div className="bg-orange-50 rounded shadow p-4 mt-4 w-full max-w-md">
      <div className="flex justify-center items-center">
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
      </div>
      <div className="flex justify-center items-center">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <p className="mt-2">Type: {pokemon.types[0].type.name}</p>

      <h3 className="mt-4 font-semibold">Stats:</h3>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name} className="flex justify-between">
            <span>{stat.stat.name}</span>
            <span>{stat.base_stat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
