import React, { useState, Fragment } from "react"
import CrosswordGrid, { CrosswordData } from "./CrosswordGrid"

const Crossword = ({ crossword }: { crossword: CrosswordData }) => {
  const [answers, setAnswers] = useState<Array<string>>([])
  const [number, setNumber] = useState(1)
  const [acrossOrDown, setAcrossOrDown] = useState<"across" | "down">("across")
  const [answer, setAnswer] = useState("")

  const addAcross = () => {
    const newAnswers = [...answers]
    const index = crossword.gridnums.findIndex((num) => num === number)

    Array.from(answer).forEach((letter, i) => {
      newAnswers[index + i] = letter
    })
    setAnswers(newAnswers)
  }

  const addDown = () => {
    const newAnswers = [...answers]
    const index = crossword.gridnums.findIndex((num) => num === number)

    Array.from(answer).forEach((letter, i) => {
      newAnswers[index + i * crossword.size.cols] = letter
    })
    setAnswers(newAnswers)
  }

  return (
    <Fragment>
      <div className="w-full h-full flex justify-center">
        <CrosswordGrid crossword={crossword} answers={answers} />
      </div>
      <form
        className="m-4 flex justify-center gap-8"
        onSubmit={(e) => {
          e.preventDefault()
          setAnswer("")
          if (acrossOrDown === "across") addAcross()
          if (acrossOrDown === "down") addDown()
        }}
      >
        <label>
          Number:{" "}
          <input
            className="rounded-xl p-2 w-22 border-2 rounded-r-none z-10"
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
          />
        </label>

        <select
          name=""
          id=""
          className="w-22 p-3 -ml-8 rounded-xl rounded-l-none"
          value={acrossOrDown}
          tabIndex={0}
          onChange={(e) => setAcrossOrDown(e.target.value as "across" | "down")}
        >
          <option value="across">Across</option>
          <option value="down">Down</option>
        </select>

        <label>
          Answer:{" "}
          <input
            className="rounded-xl p-2 w-22 border-2 font-medium"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toUpperCase())}
          />
        </label>
        <button className="rounded-xl bg-zinc-200 p-2 px-4">Add answer</button>
      </form>
    </Fragment>
  )
}

export default Crossword
