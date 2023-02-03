// import React from "react";


const App: React.FC = () => {
  const find = (some: number) => {
    const result = some * 10 * 34
    return result
  }
  return(
    <div>
      Hello world! Yo {find(3)}
    </div>
  )
}

export {App}