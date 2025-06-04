import { useEffect, useState } from "react";
import { getPokemonByName, URL } from "../api/pokemonApi";
import { Button } from "../components/button";
import { UserPokemon } from "../components/pokemon";
import type { PokemonData } from "../components/types/pokemondata";
import { RenderLifeBar } from "../components/battlelifebar";

export const BattleSetup = () => {
  const [displayPokemon, setDisplayPokemon] = useState<PokemonData | null>(null);
  const [randomPokemon, setRandomPokemon] = useState<PokemonData | null>(null);
  const [displayPokemonHp, setDisplayPokemonHp] = useState<number>(0);
  const [randomPokemonHp, setRandomPokemonHp] = useState<number>(0);
  const [startBattle, setStartBattle] = useState<boolean>(false);
  const [userPokemonList, setUserPokemonList] = useState<PokemonData[]>([]);
  const pokemonNames = [
    "pikachu", 
    "bulbasaur",
    "charmander",
    "squirtle",
    "jigglypuff",
  ];

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

  const UserAttack = () => {
    setRandomPokemonHp((hp) => Math.max(0, hp - 10));
    console.log("Attacking the random Pokémon!", randomPokemonHp);
  };

   if(randomPokemonHp <=0 ) {
      console.log(`You win!`);
      return <div>You WIN!</div>
    }

  if (!userPokemonList.length || !randomPokemon) return <div>No Pokémon found.</div>;

  return (
    <main className="bg-primary-dark overflow-auto h-screen flex items-center justify-center flex-col">
      <div className="bg-cover bg-center w-92 h-92 flex flex-row items-end justify-between bg-[url('/battlebackground.png')]">
        <div className="flex flex-col items-center justify-center mb-2">
          <>
            <img src={displayPokemon?.sprites.back_default} className="w-48" />
            <RenderLifeBar pokemon={displayPokemon} hp={displayPokemonHp} />
          </>
        </div>
        {startBattle && (
          <div className="flex flex-col items-center mb-36">
            <>
              <img src={randomPokemon?.sprites.front_default} className="w-36" />
              <RenderLifeBar pokemon={randomPokemon} hp={randomPokemonHp} />
            </>
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
              color="red"
              name="Start battle"
              onClick={() => setStartBattle(true)}
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
          />
        </div>
      )}
    </main>
  );
};

import type { PokemonData } from "./types/pokemondata"

