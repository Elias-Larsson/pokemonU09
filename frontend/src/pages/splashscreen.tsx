import { useNavigate } from "react-router";

export const SplashScreen = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="w-screen h-screen flex flex-col items-center justify-center text-black text-4xl font-bold space-y-4"
      >
        <img src="/rocketlogo.png" alt="Logo" className="flex w-96 " />
        Press to start
      </div>
    </>
  );
};
