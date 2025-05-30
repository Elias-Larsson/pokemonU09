import { createBrowserRouter } from "react-router"
import { SplashScreen } from "./pages/splashscreen"
import { Profile } from "./pages/profile"
import { Home } from "./pages/home"
import { EditProfile } from "./pages/editprofile"
import { BattleSetup } from "./pages/battlesetup"
import { Battle } from "./pages/battle"

export const router = createBrowserRouter([
  {
    path: '/',
    element: < SplashScreen/>,
  },
  {
    path: '/',
    element: < Profile/>,
  },
  {
    path: '/home',
    element: < Home/>,
  },
  {
    path: '/',
    element: < EditProfile/>,
  },
  {
    path: '/',
    element: < BattleSetup/>,
  },
    {
    path: '/',
    element: < Battle/>,
  },
])