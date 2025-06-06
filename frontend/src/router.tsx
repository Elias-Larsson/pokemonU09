import { createBrowserRouter } from "react-router"
import { SplashScreen } from "./pages/splashscreen"
import { Profile } from "./pages/profile"
import { Home } from "./pages/home"
import { EditProfile } from "./pages/editprofile"
import { BattleSetup } from "./pages/battlesetup"
import { Battle } from "./pages/battle"
import { PokeSearch } from "./pages/pokeSearch"
import { Login } from "./pages/login"

export const router = createBrowserRouter([
  {
    path: '/',
    element: < SplashScreen/>,
  },
  {
    path: '/profile',
    element: < Profile/>,
  },
  {
    path: '/home',
    element: < Home/>,
  },
  {
    path: '/editprofile',
    element: < EditProfile/>,
  },
  {
    path: '/battlesetup',
    element: < BattleSetup/>,
  },
    {
    path: '/battle',
    element: < Battle/>,
  },
  {
    path: '/searchPokemon',
    element: < PokeSearch/>,
  },
  {
    path: '/login',
    element: < Login/>,
  },
])