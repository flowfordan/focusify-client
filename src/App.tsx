// import React from "react";
import { Test } from "./Test";

const App: React.FC = () => {
  const find = (some: number) => {
    const result = some * 10 * 34
    return result
  }
  return(
    <div>
      Hello world! Yo {find(3)}
      <Test />
    </div>
  )
}

export {App}