import axios from "axios";

export const URL = "https://pokeapi.co/api/v2/pokemon";
export const GET_POKEMONS = `${URL}?limit=1350`;

export const getPokemons = async (apiURL: string) => {
  const res = await axios.get(apiURL);
  return res;
};

export const getPokemonByName = async (apiURL: string, pokemon: string) => {
  const response = await axios.get(`${apiURL}/${pokemon}`);
  console.log(response.data);
  return response.data;
};

export const incrementVictory = async () => {
  try {
    await axios.put(
      "https://pokemonu09.onrender.com/auth/victory",
      {},
      { withCredentials: true }
    );
    return;
  } catch (err) {
    console.log("Failed to update victory count.", err);
    throw err;
  }
};

export const incrementDefeat = async () => {
  try {
    await axios.put(
      "https://pokemonu09.onrender.com/auth/defeat",
      {},
      { withCredentials: true }
    );
    return;
  } catch (err) {
    console.log("Failed to update defeat count.", err);
    throw err;
  }
}; 