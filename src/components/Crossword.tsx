import React, { Fragment, useState } from "react"
import CrosswordGrid, { CrosswordData } from "./CrosswordGrid"

const Crossword = ({ crossword }: { crossword: CrosswordData }) => {
  const [answers, setAnswers] = useState<Array<string>>([])
  const [number, setNumber] = useState(1)
  const [acrossOrDown, setAcrossOrDown] = useState<"across" | "down">("across")
  const [answer, setAnswer] = useState("")
  const [updatedAnswers, setUpdatedAnswers] = useState<Array<number>>([])

  const addAcross = () => {
    const newAnswers = [...answers]
    const index = crossword.gridnums.findIndex((num) => num === number)

    const newUpdatedAnswers: Array<number> = []
    Array.from(answer).forEach((letter, i) => {
      newAnswers[index + i] = letter
      newUpdatedAnswers[index + i] = 1
    })
    setUpdatedAnswers(newUpdatedAnswers)
    setAnswers(newAnswers)
  }

  const addDown = () => {
    const newAnswers = [...answers]
    const index = crossword.gridnums.findIndex((num) => num === number)

    const newUpdatedAnswers: Array<number> = []
    Array.from(answer).forEach((letter, i) => {
      newAnswers[index + i * crossword.size.cols] = letter
      newUpdatedAnswers[index + i * crossword.size.cols] = 1
    })
    setUpdatedAnswers(newUpdatedAnswers)
    setAnswers(newAnswers)
  }

  return (
    <Fragment>
      <div className="w-full h-full flex justify-center">
        <CrosswordGrid
          crossword={crossword}
          answers={answers}
          newAnswers={updatedAnswers}
        />
      </div>
      <form
        className="p-4 flex flex-wrap w-full justify-center items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          setAnswer("")
          setNumber(1)
          if (acrossOrDown === "across") addAcross()
          if (acrossOrDown === "down") addDown()
        }}
      >
        <div className="flex align-center">
          <label className="relative flex items-center">
            <span className="text-xl mr-2">Number</span>
            <input
              id="number"
              className="rounded-xl p-2 px-3 w-22 max-w-full border-2 rounded-r-none z-10"
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
            />
          </label>

          <select
            name=""
            id="direction"
            className="p-3 rounded-xl rounded-l-none"
            value={acrossOrDown}
            tabIndex={0}
            onChange={(e) =>
              setAcrossOrDown(e.target.value as "across" | "down")
            }
          >
            <option value="across">Across</option>
            <option value="down">Down</option>
          </select>
        </div>
        <label className="flex items-center">
          <span className="text-xl mr-2">Answer</span>
          <input
            id="answer"
            className="rounded-xl p-2 px-3 w-22 border-2 font-medium"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toUpperCase())}
          />
        </label>
        <button className="rounded-xl bg-zinc-200 p-2 px-4 my-2 font-medium hover:bg-zinc-100 transition">
          Add answer
        </button>
      </form>
    </Fragment>
  )
}

export default Crossword
