// import React from "react";
import { router } from "pages";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const App: React.FC = () => {
  const find = (some: number) => {
    const result = some * 10 * 34
    return result
  }
  return(
    <RouterProvider router={router} />
  )
}

export {App}