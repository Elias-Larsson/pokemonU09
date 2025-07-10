import { useEffect, useState } from "react";
import { PlayerDetails } from "../components/multiplayer/playerdetails";
import type { PlayerData } from "../components/types/player";
import { getPokemonByName, getPlayerData, URL } from "../api/pokemonApi";
import type { PokemonData } from "../components/types/pokemondata";
import { useNavigate } from "react-router-dom";
export const Multiplayer = () => {
  const WSS_URL = import.meta.env.VITE_WSS_URL;
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [player2, setPlayer2] = useState<PlayerData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const player2Pokemon: PokemonData = await getPokemonByName(
          URL,
          "pikachu",
        );
        const player1Pokemon: PokemonData = await getPokemonByName(
          URL, 
          "mew"
        );
        const playerData: any = await getPlayerData();
        if (!playerData.data.username) {
          navigate("/editprofile")
          return;
        }
       console.log(playerData)
        const player: PlayerData = {
          name: playerData.data.username,
          pokemon: player1Pokemon,
        };
        const player2: PlayerData = {
          name: "Player 2",
          pokemon: player2Pokemon,
        };
        setPlayer(player);
        setPlayer2(player2);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
  if (!player) return;
  const ws = new WebSocket(WSS_URL);

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "set-player", username: player.name }));
  };
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case "player-confirmed": {
        console.log(`Username confirmed: ${data.username}`);

        break;
      }
      case "playerlist": {
        console.log(`playerlist:`, data.players);
        
        break;
      }
      default: 
        break;
    }
    

  };
  ws.onerror = (error) => {
    console.error(`WebSocket error: ${error}`);
  };
  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };
  return () => ws.close();
}, [WSS_URL, player]);

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
