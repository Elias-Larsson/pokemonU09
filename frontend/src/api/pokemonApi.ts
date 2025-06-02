import axios from "axios";

export const URL = "https://pokeapi.co/api/v2/pokemon";
export const GET_POKEMONS = `${URL}?limit=150`;

export const getPokemons = (apiURL: string) => {
  return axios.get(apiURL);
};
