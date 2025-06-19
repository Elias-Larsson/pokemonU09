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
import { UserPokemon } from "../components/battle/pokemon";
import type { damage, PokemonData } from "../components/types/pokemondata";
import { RenderLifeBar } from "../components/battle/battlelifebar";
import { Battlelog } from "../components/battle/battlelog";
import { DamageCalculation } from "../components/battle/damagecalc";
import { CriticalCalculation } from "../components/battle/criticalcalc";

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
      const filtered = pokemons.data.results
        .map((poke: { name: string }) => poke.name)
        .filter((name: string) => pokemonNames.includes(name));

      const selectPokemons: PokemonData[] = await Promise.all(
        filtered.map((name: string) => getPokemonByName(URL, name)),
      );

      if (selectPokemons.length === 0) {
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
        data: selectPokemons[0],
        hp: selectPokemons[0].stats[0].base_stat,
      });

      setOpponentPokemon({
        data: randomOpponent,
        hp: randomOpponent.stats[0].base_stat,
      });
      
      setUserPokemonList(selectPokemons);
    };
    fetchPokemon();
    setTurn("user");
  }, [resetBattle]);

  if (!userPokemonList.length || !userPokemon || !opponentPokemon)
    return <div>No Pokémon found.</div>;

  async function getStats() {
    if (!userPokemon || !opponentPokemon) return;

    const userDamage = await DamageCalculation(
      userPokemon.data,
      opponentPokemon.data,
    );

    const opponentDamage = await DamageCalculation(
      opponentPokemon.data,
      userPokemon.data,
    );

    if (
      userPokemon.data &&
      typeof userPokemon.hp === "number" &&
      userDamage &&
      opponentPokemon.data &&
      typeof opponentPokemon.hp === "number" &&
      opponentDamage
    ) {
      setUserPokemon({
        data: userPokemon.data,
        hp: userPokemon.hp,
        damage: userDamage,
      });

      setOpponentPokemon({
        data: opponentPokemon.data,
        hp: opponentPokemon.hp,
        damage: opponentDamage,
      });
    }
  }

  const OpponentAttack = async () => {
    if (!userPokemon || !opponentPokemon || !opponentPokemon.damage) return;
    setUserPokemonAnimation("shake");
    const attackMove = Math.random() < 0.5 ? "move1" : "move2";
    const moveIndex = attackMove === "move1" ? 0 : 1;
    const critChance = Math.random() < 0.2;
    const baseDamage = opponentPokemon.damage[attackMove] ?? 0;
    const damage = (await CriticalCalculation(baseDamage, critChance)) ?? 0;
    const newHp = Math.max(0, userPokemon.hp - damage);

    if (critChance) {
      addLog(
        `Critical hit! ${opponentPokemon.data.name} used ${opponentPokemon.data.moves[moveIndex]?.move.name} for ${damage} damage! ${userPokemon.data.name} has ${newHp} remaining`,
      );
    } else {
      addLog(
        `${opponentPokemon.data.name} used ${opponentPokemon.data.moves[moveIndex]?.move.name} for ${damage} damage! ${userPokemon.data.name} has ${newHp} remaining`,
      );
    }
    if (newHp <= 0) {
      incrementDefeat();
      addLog(`You lost to ${opponentPokemon.data.name}!`);
      setResetBattle((prev) => !prev);
      setStartBattle(false);
    } else {
      setTurn("user");
    }
    setUserPokemon({ ...userPokemon, hp: newHp });
  };

  const UserAttack = async (attackMove: "move1" | "move2") => {
    if (!userPokemon || !opponentPokemon || !userPokemon.damage) return;
    setOpponentPokemonAnimation("shake");
    const moveIndex = attackMove === "move1" ? 0 : 1;
    const critChance = Math.random() < 0.2;
    const baseDamage = userPokemon.damage[attackMove] ?? 0;
    const userDamage = (await CriticalCalculation(baseDamage, critChance)) ?? 0;
    const newHp = Math.max(0, opponentPokemon.hp - userDamage);

    if (critChance) {
      addLog(
        `Critical hit! ${userPokemon.data.name} used ${userPokemon.data.moves[moveIndex]?.move.name} for ${userDamage} damage! ${opponentPokemon.data.name} has ${newHp} remaining`,
      );
    } else {
      addLog(
        `${userPokemon.data.name} used ${userPokemon.data.moves[moveIndex]?.move.name} for ${userDamage} damage! ${opponentPokemon.data.name} has ${newHp} remaining`,
      );
    }
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
    setOpponentPokemon({ ...opponentPokemon, hp: newHp });
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
