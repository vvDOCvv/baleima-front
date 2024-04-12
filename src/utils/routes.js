import Trade from "../components/Trade/Trade";
import Main from "../components/Main/Main";
import SignIn from "../components/Auth/SignIn/SignIn";
import SignUp from "../components/Auth/SignUp/SignUp";
import Profile from "../components/User/Profile/Profile";
import Tariffs from "../components/User/Tariffs/Tariffs";
import Settings from "../components/User/Settings/Settings";
import ERROR from "../components/404/404";
import { ERROR_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE, TARIFFS_ROUTE, TRADE_ROUTE,  } from "./const";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    },
    {
        path: SIGNIN_ROUTE,
        Component: SignIn,
    },
    {
        path: SIGNUP_ROUTE,
        Component: SignUp,
    },
    {
        path: ERROR_ROUTE,
        Component: ERROR,
    },
]

export const privateRoutes = [
    {
        path: TRADE_ROUTE,
        Component: Trade,
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile,
    },
    {
        path: TARIFFS_ROUTE,
        Component: Tariffs,
    },
    {
        path: SETTINGS_ROUTE,
        Component: Settings,
    },
    {
        path: ERROR_ROUTE,
        Component: ERROR,
    },
]