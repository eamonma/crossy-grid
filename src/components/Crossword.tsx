import React, { Fragment, useEffect, useState } from "react"
import CrosswordGrid, { CrosswordData } from "./CrosswordGrid"

const Crossword = ({ crossword }: { crossword: CrosswordData }) => {
  const [answers, setAnswers] = useState<Array<string>>([])
  const [number, setNumber] = useState(1)
  const [acrossOrDown, setAcrossOrDown] = useState<"across" | "down">("across")
  const [answer, setAnswer] = useState("")
  const [highlights, setHighlights] = useState<Array<boolean>>([])
  const [highlightsInput, setHighlightsInput] = useState<string>("")
  const [highlightColour, sethighlightColour] = useState<string>("")
  const [inputAnswers, setInputAnswers] = useState("")

  const addAcross = () => {
    const newAnswers = [...answers]
    const index = crossword.gridnums.findIndex((num) => num === number)

    const newUpdatedAnswers: Array<number> = []
    Array.from(answer).forEach((letter, i) => {
      newAnswers[index + i] = letter
      newUpdatedAnswers[index + i] = 1
    })
    // setUpdatedAnswers(newUpdatedAnswers)
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
    // setUpdatedAnswers(newUpdatedAnswers)
    setAnswers(newAnswers)
  }

  useEffect(() => {
    setInputAnswers(JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    setHighlightsInput(JSON.stringify(highlights))
  }, [highlights])

  return (
    <Fragment>
      <div className="flex justify-center w-full h-full">
        <CrosswordGrid
          crossword={crossword}
          answers={answers}
          highlight={highlights}
          highlightColour={highlightColour}
          // newAnswers={updatedAnswers}
        />
      </div>

      <form
        className="flex flex-wrap items-center justify-center w-full gap-4 p-4"
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
            <span className="mr-2 text-xl">Number</span>
            <input
              id="number"
              className="z-10 max-w-full p-2 px-3 border-2 rounded-r-none rounded-xl w-22"
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
            />
          </label>

          <select
            name=""
            id="direction"
            className="p-3 rounded-l-none rounded-xl"
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
          <span className="mr-2 text-xl">Answer</span>
          <input
            id="answer"
            className="p-2 px-3 font-medium border-2 rounded-xl w-22"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toUpperCase())}
          />
        </label>
        <button
          id="add-answer"
          className="p-2 px-4 my-2 font-medium transition rounded-xl bg-zinc-200 hover:bg-zinc-100"
        >
          Add answer
        </button>
      </form>
      <form
        className="p-4"
        onSubmit={(e) => {
          e.preventDefault()

          setAnswers(JSON.parse(inputAnswers))
          setInputAnswers("")
        }}
      >
        {/* <label className="flex flex-col gap-2">
          <span className="text-2xl">All answers</span>
          <textarea
            id="all-answers"
            readOnly
            className="z-10 p-3 mb-4 font-mono border-2 rounded-xl w-22 min-h-[100px]"
            value={JSON.stringify(answers)}
          />
        </label> */}
        <label className="flex flex-col gap-2">
          <span className="text-2xl">Set answers</span>
          <textarea
            id="all-answer-input"
            placeholder="['a', '', 'n', ...]"
            className="z-10 p-3 font-mono border-2 rounded-xl w-22 min-h-[100px]"
            onChange={(e) => setInputAnswers(e.target.value)}
            value={inputAnswers}
          />
        </label>
        <button
          id="set-answers"
          className="p-2 px-4 m-4 ml-0 font-medium transition rounded-xl bg-zinc-200 hover:bg-zinc-100"
          type="submit"
        >
          Set answers
        </button>
      </form>

      <form
        className="p-4"
        onSubmit={(e) => {
          e.preventDefault()

          setHighlights(JSON.parse(highlightsInput))
          setHighlightsInput("")
        }}
      >
        {/* <label className="flex flex-col gap-2">
          <span className="text-2xl">All answers</span>
          <textarea
            id="all-answers"
            readOnly
            className="z-10 p-3 mb-4 font-mono border-2 rounded-xl w-22 min-h-[100px]"
            value={JSON.stringify(answers)}
          />
        </label  <label className="flex flex-col gap-2">
          <span className="text-2xl">Set highlights colour</span>
          <input
            type="text"
            id="highlights-colour"
            placeholder="#fff"
            className="z-10 p-3 font-mono border-2 rounded-xl w-22 "
            onChange={(e) => sethighlightColour(e.target.value)}
            value={highlightColour}
          />
        </label>bel> */}

        <label className="flex flex-col gap-2">
          <span className="text-2xl">Set highlights colour</span>
          <input
            type="text"
            id="highlights-colour"
            placeholder="#fff"
            className="z-10 p-3 font-mono border-2 rounded-xl w-22 "
            onChange={(e) => sethighlightColour(e.target.value)}
            value={highlightColour}
          />
        </label>
        <button
          id="reset-highlights-colour"
          className="p-2 px-4 m-4 ml-0 font-medium transition rounded-xl bg-zinc-200 hover:bg-zinc-100"
          type="submit"
          onClick={(e) => {
            e.preventDefault()

            sethighlightColour("#fff")
          }}
        >
          Reset highlights colour to white
        </button>
        <label className="flex flex-col gap-2 mt-4">
          <span className="text-2xl">Set highlights</span>
          <textarea
            id="highlights-input"
            placeholder="['true', '', 'false', ...]"
            className="z-10 p-3 font-mono border-2 rounded-xl w-22 min-h-[100px]"
            onChange={(e) => setHighlightsInput(e.target.value)}
            value={highlightsInput}
          />
        </label>
        <button
          id="clear-highlights"
          className="p-2 px-4 m-4 ml-0 font-medium transition rounded-xl bg-zinc-200 hover:bg-zinc-100"
          onClick={(e) => {
            e.preventDefault()

            setHighlights([])
          }}
        >
          Clear highlights
        </button>
        <button
          id="set-highlights"
          className="p-2 px-4 m-4 ml-0 font-medium transition rounded-xl bg-zinc-200 hover:bg-zinc-100"
          type="submit"
        >
          Set highlights
        </button>
      </form>
    </Fragment>
  )
}

export default Crossword
