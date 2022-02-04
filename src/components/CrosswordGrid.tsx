import React from "react"

type Answers = {
  across: Array<string>
  down: Array<string>
}

type Clues = {
  across: Array<string>
  down: Array<string>
}

type Size = {
  cols: number
  rows: number
}

export interface CrosswordData {
  answers: Answers
  author: string
  clues: Clues
  grid: Array<string>
  gridnums: Array<number>
  date: string
  size: Size
}

const CrosswordGrid = ({
  crossword,
  answers,
  newAnswers,
}: {
  crossword: CrosswordData
  answers: Array<string>
  newAnswers: Array<number>
}) => {
  return (
    <div id="crossword-grid" className="m-4">
      <div
        className="grid border-4 border-black w-fit"
        style={{
          gridTemplateColumns: `repeat(${crossword.size.cols}, 40px)`,
          gridTemplateRows: `repeat(${crossword.size.rows}, 40px)`,
        }}
      >
        {[...new Array(crossword.size.cols * crossword.size.rows)].map(
          (_, i) => {
            return (
              <div
                className={`border-[0.8px] text-zinc-800 border-gray-400 relative w-full h-full items-center flex font-normal text-3xl  ${
                  crossword.grid[i] === "."
                    ? "bg-zinc-900"
                    : newAnswers[i] === 1 && "bg-yellow-200"
                }`}
              >
                <div className="text-[11px] leading-[11px] tracking-tighter m-0 p-0 absolute top-[1.4px] left-[2px] font-semibold">
                  {!!crossword.gridnums[i] && crossword.gridnums[i]}
                </div>
                <div className="w-full h-full flex relative top-1 justify-center items-center">
                  {answers[i] && crossword.grid[i] !== "." && answers[i]}
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default CrosswordGrid
