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
  highlights = [],
}: {
  crossword: CrosswordData
  answers: Array<string>
  highlights?: { [gridNum: number]: string }
  highlightColour?: string
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
            let backgroundColour = "#fff"
            if (crossword.grid[i] === ".") backgroundColour = "rgb(24 24 27)"
            else if (Object.keys(highlights).includes(i.toString()))
              backgroundColour = highlights[i]
            return (
              <div
                key={i}
                className={`relative flex items-center w-full h-full text-3xl font-normal border-gray-400 border-[0.4px] text-zinc-800`}
                style={{
                  backgroundColor: backgroundColour,
                }}
              >
                <div className="absolute p-0 m-0 font-semibold tracking-tighter text-[11px] leading-[11px] top-[1.4px] left-[2px]">
                  {!!crossword.gridnums[i] && crossword.gridnums[i]}
                </div>
                <div className="relative flex items-center justify-center w-full h-full top-1">
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
