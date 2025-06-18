import type { PokemonData } from "./pokemondata";

export type PlayerData = {
    name: string;
    pokemon?: PokemonData | null;
}