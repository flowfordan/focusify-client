// import React from "react";
import { router } from "pages";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import "./index.scss";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export { App };
