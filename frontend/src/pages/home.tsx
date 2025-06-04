import { Button } from "../components/button";

export const Home = () => {
    return (
        <div
         className="bg-cover bg-center h-screen flex flex-col items-center justify-items-start bg-[url('/homebackground.png')]"
         >
                <img src="/rocketlogo.png" alt="Logo" className="w-96" />
            <section className="flex flex-col text-center gap-y-2">
                <Button buttonType="link" name="Play" color="red" route="/battlesetup" />
                <Button buttonType="link" name="Profile" color="white" route="/profile" />
            </section>
        </div>
    );
}