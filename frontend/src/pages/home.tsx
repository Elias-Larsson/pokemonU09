import { Button } from "../components/button";

export const Home = () => {

  return (
    <div className="bg-cover bg-center h-screen flex flex-col items-center justify-items-start bg-[url('/homebackground.png')]">
      <img src="/rocketlogo.png" alt="Logo" className="w-96" />
      <section className="flex flex-col text-center gap-y-2">
        <Button name="Play" color="red" buttonType="link" route="/battlesetup" />
        <Button name="Profile" color="white" buttonType="link" route="/profile" />
      </section>
    </div>
  );
};

