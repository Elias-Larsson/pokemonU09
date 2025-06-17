import axios from "axios";
import type { PokemonData } from "../types/pokemondata";

export const DamageCalculation = async (
  attackingPokemon: PokemonData,
  defendingPokemon: PokemonData
) => {
  try {
    const attackStat =
      attackingPokemon.stats.find((stat) => stat.name === "attack")
        ?.base_stat || 50;
    const defenseStat =
      defendingPokemon.stats.find((stat) => stat.name === "defense")
        ?.base_stat || 50;
    const move1Name = attackingPokemon.moves[0]?.move.name;
    const move2Name = attackingPokemon.moves[1]?.move.name;
    const move1Stats = await axios.get(`https://pokeapi.co/api/v2/move/${move1Name}`);
    const move2Stats = await axios.get(`https://pokeapi.co/api/v2/move/${move2Name}`);

    const damage = {
      move1: Math.floor((attackStat / defenseStat) * move1Stats.data.power / 10 + 4),
      move2: Math.floor((attackStat / defenseStat) * move2Stats.data.power / 10 + 4),
    };
    
    return damage;
  } catch (error) {
    console.error("Error fetching move power:", error);
  }
};