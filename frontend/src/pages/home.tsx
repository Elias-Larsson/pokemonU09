import { useNavigate } from "react-router";
import { getPlayerData } from "../api/pokemonApi";
import { Button } from "../components/button";
import { useEffect, useState } from "react";

export const Home = () => {
const [username, setUsername] = useState<boolean>(false);
const navigate = useNavigate();

  useEffect( () => {
    const fetchUsername = async () => {
      const playerData = await getPlayerData(); 
      if(playerData.data.username) {
        setUsername(true); 
      }
    }
    fetchUsername();
  }, [])
  return (
    <div className="bg-cover bg-center h-screen flex flex-col items-center justify-items-start bg-[url('/homebackground.png')]">
      <img src="/rocketlogo.png" alt="Logo" className="w-96" />
      <section className="flex flex-col text-center gap-y-2">
        <Button name="Play" color="red" buttonType="link" route="/battlesetup" />
        <Button name="Multiplayer" color="yellow" buttonType="click" onClick={async () => {
          if (!username) {
            navigate("/editprofile");
          } else navigate("/multiplayer")

        }} />
        <Button name="Profile" color="white" buttonType="link" route="/profile" />
      </section>
    </div>
  );
};
  
