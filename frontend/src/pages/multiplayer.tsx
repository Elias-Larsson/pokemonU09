import { useEffect, useState } from "react";
import { PlayerDetails } from "../components/multiplayer/playerdetails";
import type { PlayerData } from "../components/types/player";
import { getPokemonByName, URL } from "../api/pokemonApi";
import type { PokemonData } from "../components/types/pokemondata";

export const Multiplayer = () => {
  const WSS_URL = import.meta.env.VITE_WSS_URL;

  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [player2, setPlayer2] = useState<PlayerData | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const player2Pokemon: PokemonData = await getPokemonByName(
          URL,
          "pikachu",
        );
        const player1Pokemon: PokemonData = await getPokemonByName(URL, "mew");

        const player1: PlayerData = {
          name: "Player 1",
          pokemon: player1Pokemon,
        };
        const player2: PlayerData = {
          name: "Player 2",
          pokemon: player2Pokemon,
        };
        setPlayer(player1);
        setPlayer2(player2);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(WSS_URL);
    ws.onopen = () => {
      console.log("WebSocket connection established");
      ws.send("Hello from the client!");
    };
    ws.onmessage = (event) => {
      console.log(`Message from server: ${event.data}`);
    };
    ws.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, [WSS_URL]);

  if (!player || !player2) return <div>Loading...</div>;

  return (
    <main className="h-screen bg-primary-dark text-white overflow-auto text-3xl flex justify-center flex-col">
      <div className="flex flex-row items justify-around">
        <PlayerDetails player={player} readyCheck={true} />
        <PlayerDetails player={player2} readyCheck={false} />
      </div>
    </main>
  );
};
