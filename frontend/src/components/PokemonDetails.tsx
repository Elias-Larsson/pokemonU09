interface Props {
  pokemon: any;
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
        {pokemon.stats.map((stat: any) => (
          <li key={stat.stat.name} className="flex justify-between">
            <span>{stat.stat.name}</span>
            <span>{stat.base_stat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
