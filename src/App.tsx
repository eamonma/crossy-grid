import React from "react"
import Crossword from "./components/Crossword"
import { CrosswordData } from "./components/CrosswordGrid"
import puzzleData from "./test.json"

function App() {
  return (
    <div className="App">
      <Crossword crossword={puzzleData as CrosswordData} />
    </div>
  )
}

export default App
