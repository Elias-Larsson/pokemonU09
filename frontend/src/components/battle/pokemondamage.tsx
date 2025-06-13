import axios from "axios";
import type { PokemonData } from "../types/pokemondata";

  export const damageCalculation = async (displayPokemon: PokemonData, displayPokemonStats: { base_stat: number; stat: { name: string } }[] ) => { 
        try { 
          const attackStat = displayPokemonStats.find(stat => stat.stat.name === 'attack')?.base_stat || 50;
          const defenseStat = displayPokemonStats.find(stat => stat.stat.name === 'defense')?.base_stat || 50;
          const move1Name = displayPokemon.moves[0]?.move.name;
          const move2Name = displayPokemon.moves[1]?.move.name;
          const move1 = await axios.get(`https://pokeapi.co/api/v2/move/${move1Name}`)
          const move2 = await axios.get(`https://pokeapi.co/api/v2/move/${move2Name}`)

            
          const move1Damage = Math.floor((attackStat / defenseStat) * move1.data.power / 10 + 2);  
          console.log("Display Pokemon Stats:", [move1.data.power, attackStat, defenseStat]); 
          console.log("Display Pokemon total damage:", move1Damage);
          
        } catch (error) {   
          console.error("Error fetching move power:", error);
        }
        
      }