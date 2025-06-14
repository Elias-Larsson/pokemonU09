import { Button } from "../components/button";

export const Profile = () => {
  return (
    <div className="bg-cover bg-center h-screen flex flex-col items-center justify-center bg-[url('/homebackground.png')]">
      <h1 className="text-4xl font-pixel text-black mb-4">Profile</h1>
      <img src="/dragon.svg" alt="Profile Icon" className="w-40 mb-6" />
      
      <div className="flex flex-col text-center gap-2 w-24">
        <Button name="Pokemon" color="red" buttonType="link" route="/pokeSearch" />
        <Button name="Edit" color="white" buttonType="link" route="/editprofile" />
        <Button name="Log" color="white" buttonType="link" route="/profileLog" />
      </div>
    </div>
  );
};
