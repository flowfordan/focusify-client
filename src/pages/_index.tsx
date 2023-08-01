//Routing for the pages
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Home } from "./Home";
import { LogIn } from "./LogIn";
import { Privacy } from "./Privacy";
import { ResetPassword } from "./ResetPassword";
import { SignUp } from "./SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
  {
    path: "/stats",
    element: <div>Statistics</div>,
  },
]);
