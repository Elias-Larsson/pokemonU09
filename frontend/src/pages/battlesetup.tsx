import { useEffect, useState } from "react";
import {
  getPokemons,
  getPokemonByName,
  incrementDefeat,
  incrementVictory,
  GET_POKEMONS,
  URL,
} from "../api/pokemonApi";
import { Button } from "../components/button";
import { UserPokemon } from "../components/pokemon";
import type { PokemonData } from "../components/types/pokemondata";
import { RenderLifeBar } from "../components/battlelifebar";
import { Battlelog } from "../components/battlelog";
import { damageCalculation } from "../components/battle/damagecalc";

export const BattleSetup = () => {
  const [userPokemonList, setUserPokemonList] = useState<PokemonData[]>([]);
  const [userPokemon, setUserPokemon] = useState<{
    data: PokemonData;
    hp: number;
  } | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<{
    data: PokemonData;
    hp: number;
  } | null>(null);
  const [startBattle, setStartBattle] = useState<boolean>(false);
  const [attacklogs, setAttacklogs] = useState<string[]>([]);
  const [turn, setTurn] = useState<"user" | "opponent">("user");
  const [userPokemonAnimation, setUserPokemonAnimation] = useState<
    "hover-image" | "shake"
  >("hover-image");
  const [opponentPokemonAnimation, setOpponentPokemonAnimation] = useState<
    "hover-image" | "shake"
  >("hover-image");
  const [damage, setDamage] = useState<Awaited<
    ReturnType<typeof damageCalculation>
  > | null>(null);
  const pokemonNames = [
    "pikachu",
    "bulbasaur",
    "charmander",
    "squirtle",
    "jigglypuff",
    "chandelure",
    "arceus",
  ];

  const addLog = (log: string) => {
    setAttacklogs((logs) => [...logs, log]);
  };

    

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemons = await getPokemons(GET_POKEMONS);
      const filtered = pokemons.data.results.filter((item: { name: string }) =>
        pokemonNames.includes(item.name)
      );

      const data: PokemonData[] = await Promise.all(
        filtered.map((item: { name: string }) =>
          getPokemonByName(URL, item.name)
        )
      );

      if (data.length === 0) {
        console.error("No matching Pokémon found in API results.");
        setUserPokemonList([]);
        setUserPokemon(null);
        return;
      }

      const randomIndex = Math.floor(Math.random() * pokemons.data.results.length);
      console.log(randomIndex);
      const randomOpponentIndex = Math.floor(Math.random() * data.length);
      
      setUserPokemon({ data: data[0], hp: data[0].stats[0].base_stat });
      setOpponentPokemon({
        data: data[randomOpponentIndex],
        hp: data[randomOpponentIndex].stats[0].base_stat,
      });
      setUserPokemonList(data);
    };
    fetchPokemon();
  }, []);

  if (!userPokemonList.length || !userPokemon || !opponentPokemon)
    return <div>No Pokémon found.</div>;

  async function getStats(index: number) {
    if (!userPokemon) return;
    const damage = await damageCalculation(
      userPokemonList[index],
      opponentPokemon!.data,
    );
    setDamage(damage);
    console.log("Damage Calculation:", damage);
  }

  const OpponentAttack = async () => {
    setUserPokemonAnimation("shake");
    setUserPokemon((prev) => {
      if (!prev) return prev;
      const newHp = Math.max(0, prev.hp - 10);
      addLog(
        `${opponentPokemon.data.name} is attacking for 10 damage! ${userPokemon.data.name} has ${newHp} remaining`,
      );
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

  const UserAttack = async (attackMove: "move1" | "move2") => {
    setOpponentPokemonAnimation("shake");

    setOpponentPokemon((prev) => {
      if (!prev) return prev;
      const newHp = Math.max(0, prev.hp - damage![attackMove]);
      addLog(
        `${userPokemon.data.name} is attacking for ${damage![attackMove]} damage! ${opponentPokemon.data.name} has ${newHp} remaining`,
      );
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
    <main className="bg-primary-dark overflow-auto flex items-center justify-center flex-col">
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
            <RenderLifeBar
              pokemon={opponentPokemon.data}
              hp={opponentPokemon.hp}
            />
          </div>
        )}
      </div>
      {!startBattle && (
        <>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            {userPokemonList.map((pokemon) => (
              <button
                key={pokemon.name}
                onClick={() => {
                  setUserPokemon({
                    data: pokemon,
                    hp: pokemon.stats[0].base_stat,
                  });
                }}
              >
                <UserPokemon
                  pokemon={pokemon}
                  bgColor={
                    pokemon.name === userPokemon.data.name
                      ? "bg-zinc-600"
                      : "bg-zinc-500"
                  }
                />
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center hover">
            <Button
              buttonType="click"
              color="yellow"
              name="Start battle"
              onClick={() => {
                setStartBattle(true);
                setTurn("user");
                setUserPokemon((prev) =>
                  prev ? { ...prev, hp: prev.data.stats[0].base_stat } : prev,
                );
                setOpponentPokemon((prev) =>
                  prev ? { ...prev, hp: prev.data.stats[0].base_stat } : prev,
                );
                const selectedIndex = userPokemonList.findIndex(
                  (pokemon) => pokemon.name === userPokemon.data.name
                );
                getStats(selectedIndex);
                setAttacklogs([]);
              }}
            />
          </div>
        </>
      )}

      {startBattle && (
        <div className="flex flex-row">
          <div className="flex justify-center items-center m-4">
            <Button
              buttonType="click"
              color="red"
              name={`${userPokemon.data.moves[0]?.move.name || "Move 1"}`}
              onClick={() => {
                UserAttack("move1");
              }}
              disabled={turn !== "user"}
            />
          </div>
          <div className="flex justify-center items-center m-4">
            <Button
              buttonType="click"
              color="red"
              name={`${userPokemon.data.moves[1]?.move.name || "Move 2"}`}
              onClick={() => {
                UserAttack("move2");
              }}
              disabled={turn !== "user"}
            />
          </div>
        </div>
      )}
      <Battlelog attacklogs={attacklogs} />
    </main>
  );
};
