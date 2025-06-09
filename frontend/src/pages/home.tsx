import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import axios from "axios";

export const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get("http://localhost:3020/api/googleUser", {
          withCredentials: true,
        });
      } catch {
        navigate("/login");
      }
    };

    checkLogin();
  }, [navigate]);

  return (
    <div className="bg-cover bg-center h-screen flex flex-col items-center justify-items-start bg-[url('/homebackground.png')]">
      <img src="/rocketlogo.png" alt="Logo" className="w-96" />
      <section className="flex flex-col text-center gap-y-2">
        <Button name="Play" color="red" buttonType="link" route="/battlsetup" />
        <Button name="Profile" color="white" buttonType="link" route="/profile" />
      </section>
    </div>
  );
};

