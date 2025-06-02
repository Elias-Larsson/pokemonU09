import axios from "axios";

export const URL = "https://pokeapi.co/api/v2/pokemon";
export const GET_POKEMONS = `${URL}?limit=150/`;

export const getPokemons = (apiURL: any) => {
  return new Promise((resolve, reject) => {
    return axios({
      method: "GET",
      url: apiURL,
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
