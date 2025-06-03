import axios from "axios";

export const URL = "https://pokeapi.co/api/v2/pokemon";
export const GET_POKEMONS = `${URL}?limit=150`;

export const getPokemons = (apiURL: string) => {
  return axios.get(apiURL);
};

export const getPokemonByName = (apiURL: string, pokemon: string) => {
  return axios.get(`${apiURL}/${pokemon}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
}
