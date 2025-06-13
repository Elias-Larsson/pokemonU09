import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./pages/splashscreen";
import { Profile } from "./pages/profile";
import { Home } from "./pages/home";
import { EditProfile } from "./pages/editprofile";
import { BattleSetup } from "./pages/battlesetup";
import { Battle } from "./pages/battle";
import { PokeSearch } from "./pages/pokeSearch";
import { Login } from "./pages/login";
import { Shield } from "./components/sheild";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/profile",
    element: (
      <Shield>
        <Profile />,
      </Shield>
    ),
  },
  {
    path: "/home",
    element: (
      <Shield>
        <Home />,
      </Shield>
    ),
  },
  {
    path: "/editprofile",

    element: (
      <Shield>
        <EditProfile />,
      </Shield>
    ),
  },
  {
    path: "/battlesetup",
    element: (
      <Shield>
        <BattleSetup />,
      </Shield>
    ),
  },
  {
    path: "/battle",
    element: (
      <Shield>
        <Battle />,
      </Shield>
    ),
  },
  {
    path: "/pokeSearch",
    element: (
      <Shield>
        <PokeSearch />,
      </Shield>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
