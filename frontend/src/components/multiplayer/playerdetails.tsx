import type { PlayerData } from "../types/player";

type Props = {
    player: PlayerData;
    readyCheck: Boolean;
}
export const PlayerDetails = ({ player, readyCheck }: Props) => {
  return (
    <section className="flex flex-col items-center gap-2">
        <h1>{player.name}</h1>   
        <img src={player.pokemon ? player.pokemon.sprites.front_default : "/mew.svg" }/>
        <div>
        <p>{readyCheck ? "✅" : "❌"}</p>
    </div>
    </section>
  );
};
  
