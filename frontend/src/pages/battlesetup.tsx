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
import type { damage, PokemonData } from "../components/types/pokemondata";
import { RenderLifeBar } from "../components/battlelifebar";
import { Battlelog } from "../components/battlelog";
import { damageCalculation } from "../components/battle/damagecalc";

export const BattleSetup = () => {
  const [userPokemonList, setUserPokemonList] = useState<PokemonData[]>([]);
  const [userPokemon, setUserPokemon] = useState<{
    data: PokemonData;
    hp: number;
    damage?: damage;
  } | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<{
    data: PokemonData;
    hp: number;
    damage?: damage;
  } | null>(null);
  const [startBattle, setStartBattle] = useState<boolean>(false);
  const [resetBattle, setResetBattle] = useState<boolean>(false);
  const [attacklogs, setAttacklogs] = useState<string[]>([]);
  const [turn, setTurn] = useState<"user" | "opponent">("user");
  const [userPokemonAnimation, setUserPokemonAnimation] = useState<
    "hover-image" | "shake"
  >("hover-image");
  const [opponentPokemonAnimation, setOpponentPokemonAnimation] = useState<
    "hover-image" | "shake"
  >("hover-image");
  const pokemonNames = [
    "pikachu",
    "palkia",
    "charizard",
    "gholdengo",
    "jigglypuff",
    "chandelure",
    "arceus",
    "Passimian",
    "gengar",
    "lucario",
    "greninja",
  ];

  const addLog = (log: string) => {
    setAttacklogs((logs) => [...logs, log]);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemons = await getPokemons(GET_POKEMONS);
      const filtered = pokemons.data.results.filter((item: { name: string }) =>
        pokemonNames.includes(item.name),
      );

      const data: PokemonData[] = await Promise.all(
        filtered.map((item: { name: string }) =>
          getPokemonByName(URL, item.name),
        ),
      );

      if (data.length === 0) {
        console.error("No matching Pokémon found in API results.");
        setUserPokemonList([]);
        setUserPokemon(null);
        return;
      }

      const randomIndex = Math.floor(
        Math.random() * pokemons.data.results.length,
      );
      const randomOpponent: PokemonData = await getPokemonByName(
        URL,
        pokemons.data.results[randomIndex].name,
      );

      setUserPokemon({
        data: data[0],
        hp: data[0].stats[0].base_stat,
      });

      setOpponentPokemon({
        data: randomOpponent,
        hp: randomOpponent.stats[0].base_stat,
      });

      setUserPokemonList(data);
    };
    fetchPokemon();
    setTurn("user");
  }, [resetBattle]);

  if (!userPokemonList.length || !userPokemon || !opponentPokemon)
    return <div>No Pokémon found.</div>;

  async function getStats() {
    if (!userPokemon || !opponentPokemon) return;

    const userDamage = await damageCalculation(
      userPokemon.data,
      opponentPokemon.data,
    );
    console.log("User Damage:", userDamage);

    const opponentDamage = await damageCalculation(
      opponentPokemon.data,
      userPokemon.data,
    );
    console.log("opponent Damage:", opponentDamage);

    setUserPokemon({
      ...userPokemon,
      damage: userDamage,
    });

    setOpponentPokemon({
      ...opponentPokemon,
      damage: opponentDamage,
    });
  }

  const OpponentAttack = async () => {
    setUserPokemonAnimation("shake");
    setUserPokemon((prev) => {
      if (!prev || !opponentPokemon.damage) return prev;
      const attackMove = Math.random() < 0.5 ? "move1" : "move2";
      const moveIndex = attackMove === "move1" ? 0 : 1;
      const newHp = Math.max(0, prev.hp - opponentPokemon.damage[attackMove]);
      addLog(
        `${opponentPokemon.data.name} used ${opponentPokemon.data.moves[moveIndex]?.move.name} for ${opponentPokemon.damage[attackMove]} damage! ${userPokemon.data.name} has ${newHp} remaining`,
      );
      if (newHp <= 0) {
        incrementDefeat();
        addLog(`You lost to ${opponentPokemon.data.name}!`);
        setResetBattle((prev) => !prev);
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
      if (!prev || !userPokemon.damage) return prev;
      const moveIndex = attackMove === "move1" ? 0 : 1;
      const newHp = Math.max(0, prev.hp - userPokemon.damage[attackMove]);
      addLog(
        `${userPokemon.data.name} used ${userPokemon.data.moves[moveIndex]?.move.name} for ${userPokemon.damage[attackMove]} damage! ${opponentPokemon.data.name} has ${newHp} remaining`,
      );
      if (newHp <= 0) {
        incrementVictory();
        addLog(`You win!`);
        setResetBattle((prev) => !prev);
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
    <main className="h-screen bg-primary-dark overflow-auto flex items-center justify-top flex-col">
      <div className="bg-cover bg-center w-92 h-92 flex flex-row items-end justify-between bg-[url('/battlebackground.png')]">
        <div className="flex flex-col items-center justify-center mb-2">
          <img
            src={
              userPokemon.data.sprites.back_default ||
              userPokemon.data.sprites.front_default
            }
            className={`w-48 ${userPokemonAnimation}`}
            onAnimationEnd={() => setUserPokemonAnimation("hover-image")}
          />
          <RenderLifeBar pokemon={userPokemon.data} hp={userPokemon.hp} />
        </div>
        {startBattle && (
          <div className="flex flex-col items-center mb-36">
            <img
              src={
                opponentPokemon.data.sprites.front_default ||
                opponentPokemon.data.sprites.front_default
              }
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
                getStats();
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
