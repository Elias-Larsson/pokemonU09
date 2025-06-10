import { useEffect, useState } from "react";
import { getPokemonByName, incrementDefeat, incrementVictory, URL } from "../api/pokemonApi";
import { Button } from "../components/button";
import { UserPokemon } from "../components/pokemon";
import type { PokemonData } from "../components/types/pokemondata";
import { RenderLifeBar } from "../components/battlelifebar";
import axios from "axios";

export const BattleSetup = () => {
  const [userPokemonList, setUserPokemonList] = useState<PokemonData[]>([]);
  const [displayPokemon, setDisplayPokemon] = useState<PokemonData | null>(null);
  const [randomPokemon, setRandomPokemon] = useState<PokemonData | null>(null);
  const [displayPokemonHp, setDisplayPokemonHp] = useState<number>(0);
  const [randomPokemonHp, setRandomPokemonHp] = useState<number>(0);
  const [startBattle, setStartBattle] = useState<boolean>(false);
  const [attacklogs, setAttacklogs] = useState<string[]>([]);
  const [turn, setTurn] = useState<"user" | "opponent">("user");
  const pokemonNames = [
    "pikachu", 
    "bulbasaur",
    "charmander",
    "squirtle",
    "jigglypuff",
  ];

  const battleLogScrollClass = `
  max-h-100 overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-primary-dark
  [&::-webkit-scrollbar-thumb]:bg-gray-100
  dark:[&::-webkit-scrollbar-track]:bg-primary-dark
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700
`;

  useEffect(() => {
    const fetchPokemon = async () => {
      const requests = pokemonNames.map((name) =>
        getPokemonByName(URL, name)
      );
      const requestPoke = await getPokemonByName(URL, "mewtwo");
      setRandomPokemon(requestPoke);
      setRandomPokemonHp(requestPoke.stats[0].base_stat);
      const data = await Promise.all(requests);
      setUserPokemonList(data);
      setDisplayPokemon(data[0]);
      setDisplayPokemonHp(data[0].stats[0].base_stat); 
    };
    fetchPokemon();
  }, []);

  if (!userPokemonList.length || !randomPokemon) return <div>No Pokémon found.</div>;

 const addLog = (log: string) => {
  setAttacklogs((logs) => [...logs, log]);
  };
   
const OpponentAttack = async () => {
  setDisplayPokemonHp((hp) => {
    const newOpponentHp = Math.max(0, hp - 2);
    addLog(`${randomPokemon.name} is attacking! ${newOpponentHp}`);
    if (newOpponentHp <= 0) {
      incrementDefeat();
      addLog(`You lost to ${randomPokemon.name}!`);
      setStartBattle(false);
    } else {
      setTurn("user")
    }
    return newOpponentHp;
  });
};
  const UserAttack = async () => {
  setRandomPokemonHp((hp) => {
    const newHp = Math.max(0, hp - 20);
    addLog(`Attacking the random Pokémon! ${newHp}`);
    if (newHp <= 0) {
      incrementVictory();
      addLog(`You win!`);
      setStartBattle(false);
    } else {
      setTurn("opponent")
    }
    return newHp;
  });
  setTimeout(() => {
    OpponentAttack();
  }, 1000);
};

return (
  <main className="bg-primary-dark overflow-auto h-screen flex items-center justify-center flex-col">
    <div className="bg-cover bg-center w-92 h-92 flex flex-row items-end justify-between bg-[url('/battlebackground.png')]">
      <div className="flex flex-col items-center justify-center mb-2">
        <img src={displayPokemon?.sprites.back_default} className="w-48" />
        <RenderLifeBar pokemon={displayPokemon || randomPokemon} hp={displayPokemonHp} />
      </div>
      {startBattle && (
        <div className="flex flex-col items-center mb-36">
          <img src={randomPokemon?.sprites.front_default} className="w-36" />
          <RenderLifeBar pokemon={randomPokemon} hp={randomPokemonHp} />
        </div>
      )}
    </div>
    {!startBattle && (
      <>
        <div className="flex flex-row gap-4 justify-center">
          {userPokemonList.map((pokemon) => (
            <button key={pokemon.name} onClick={() => {
              setDisplayPokemon(pokemon);
              setDisplayPokemonHp(pokemon.stats[0].base_stat);
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

    <div className="text-white flex flex-col ">
      <h1 className="text-3xl text-center">--- Battle log ---</h1>
      <ul className={`flex flex-col h-36 w-96 overflow-y-scroll ${battleLogScrollClass} battlog`}>
        <li>
          The battle begins...
        </li>
        {attacklogs.map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  </main>
)};
