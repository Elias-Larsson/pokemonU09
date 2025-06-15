import { useEffect, useState } from "react";

type User = {
  displayName: string;
  username: string;
  victoryCount: number;
  defeatCount: number;
};

const ProfileLog = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch( `${import.meta.env.VITE_BACKEND_URL}/api/googleUser`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("could not get user", err));
  }, []);

  if (!user) return;

  return (
    <div
      className="min-h-screen flex items-center justify-center  bg-center"
      style={{ backgroundImage: `url("/sunsetbg.png")` }}
    >
      <div className="bg-gray-300 border-2 p-6 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">
          Välkommen, {user.username || user.displayName}!
        </h1>
        <p className="text-2xl"> Wins: {user.victoryCount}</p>
        <p className="text-xl"> Loses: {user.defeatCount}</p>
      </div>
    </div>
  );
};

export default ProfileLog;
