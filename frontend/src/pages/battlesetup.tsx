import { useEffect, useState } from "react";
import { getPokemonByName, incrementDefeat, incrementVictory, URL } from "../api/pokemonApi";
import { Button } from "../components/button";
import { UserPokemon } from "../components/pokemon";
import type { PokemonData } from "../components/types/pokemondata";
import { RenderLifeBar } from "../components/battlelifebar";
import { Battlelog } from "../components/battlelog";

export const BattleSetup = () => {
  const [userPokemonList, setUserPokemonList] = useState<PokemonData[]>([]);
  const [userPokemon, setUserPokemon] = useState<{ data: PokemonData; hp: number } | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<{ data: PokemonData; hp: number } | null>(null);
  const [startBattle, setStartBattle] = useState<boolean>(false);
  const [attacklogs, setAttacklogs] = useState<string[]>([]);
  const [turn, setTurn] = useState<"user" | "opponent">("user");
  const [userPokemonAnimation, setUserPokemonAnimation] = useState<"hover-image" | "shake">("hover-image");
  const [opponentPokemonAnimation, setOpponentPokemonAnimation] = useState<"hover-image" | "shake">("hover-image");

  const pokemonNames = [
    "pikachu",
    "bulbasaur",
    "charmander",
    "squirtle",
    "jigglypuff",
  ];

  const addLog = (log: string) => {
    setAttacklogs((logs) => [...logs, log]);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const requests = pokemonNames.map((name) =>
        getPokemonByName(URL, name)
      );

      const data = await Promise.all(requests);
      const requestPoke = await getPokemonByName(URL, "mewtwo");
      setUserPokemon({ data: data[0], hp: data[0].stats[0].base_stat });
      setOpponentPokemon({ data: requestPoke, hp: requestPoke.stats[0].base_stat });
      setUserPokemonList(data);
    };
    fetchPokemon();
  }, []);

  if (!userPokemonList.length || !userPokemon || !opponentPokemon) return <div>No Pokémon found.</div>;

  const OpponentAttack = async () => {
    setUserPokemonAnimation("shake");
    setUserPokemon((prev) => {
      if (!prev) return prev;
      const newHp = Math.max(0, prev.hp - 2);
      addLog(`${opponentPokemon.data.name} is attacking! ${newHp}`);
      if (newHp <= 0) {
        incrementDefeat();
        addLog(`You lost to ${opponentPokemon.data.name}!`);
        setStartBattle(false);
      } else {
        setTurn("user");
      }
      return { ...prev, hp: newHp };
    });
  };

  const UserAttack = async () => {
    setOpponentPokemonAnimation("shake");
    setOpponentPokemon((prev) => {
      if (!prev) return prev;
      const newHp = Math.max(0, prev.hp - 20);
      addLog(`Attacking the ${opponentPokemon.data.name} Pokémon! ${newHp}`);
      if (newHp <= 0) {
        incrementVictory();
        addLog(`You win!`);
        setStartBattle(false);
      } else {
        setTurn("opponent");
        setTimeout(() => {
          OpponentAttack();
        }, 1000);
      }
      return { ...prev, hp: newHp };
    });
  };

  return (
    <main className="bg-primary-dark overflow-auto h-screen flex items-center justify-center flex-col">
      <div className="bg-cover bg-center w-92 h-92 flex flex-row items-end justify-between bg-[url('/battlebackground.png')]">
        <div className="flex flex-col items-center justify-center mb-2">
          <img
            src={userPokemon.data.sprites.back_default}
            className={`w-48 ${userPokemonAnimation}`}
            onAnimationEnd={() => setUserPokemonAnimation("hover-image")}
          />
          <RenderLifeBar pokemon={userPokemon.data} hp={userPokemon.hp} />
        </div>
        {startBattle && (
          <div className="flex flex-col items-center mb-36">
            <img
              src={opponentPokemon.data.sprites.front_default}
              className={`w-36 ${opponentPokemonAnimation}`}
              onAnimationEnd={() => setOpponentPokemonAnimation("hover-image")}
            />
            <RenderLifeBar pokemon={opponentPokemon.data} hp={opponentPokemon.hp} />
          </div>
        )}
      </div>
      {!startBattle && (
        <>
          <div className="flex flex-row gap-4 justify-center">
            {userPokemonList.map((pokemon) => (
              <button key={pokemon.name} onClick={() => {
                setUserPokemon({ data: pokemon, hp: pokemon.stats[0].base_stat });
              }}>
                <UserPokemon pokemon={pokemon} />
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <Button
              buttonType="click"
              color="yellow"
              name="Start battle"
              onClick={() => {
                setStartBattle(true);
                setTurn("user");
                setUserPokemon((prev) => prev ? { ...prev, hp: prev.data.stats[0].base_stat } : prev);
                setOpponentPokemon((prev) => prev ? { ...prev, hp: prev.data.stats[0].base_stat } : prev);
                setAttacklogs([]);
              }}
            />
          </div>
        </>
      )}

      {startBattle && (
        <div className="flex justify-center items-center m-4">
          <Button
            buttonType="click"
            color="red"
            name="Attack"
            onClick={UserAttack}
            disabled={turn !== "user"}
          />
        </div>
      )}
      <Battlelog attacklogs={attacklogs} />
    </main>
  );
};