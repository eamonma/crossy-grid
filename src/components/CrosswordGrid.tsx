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
}: {
  crossword: CrosswordData
  answers: Array<string>
}) => {
  return (
    <div>
      <div
        className="m-4 grid border-4 border-black w-fit"
        style={{
          gridTemplateColumns: `repeat(${crossword.size.cols}, 40px)`,
          gridTemplateRows: `repeat(${crossword.size.rows}, 40px)`,
        }}
      >
        {/* {crossword..map(() => (
          <div className="w-full h-full flex justify-center items-center odd:bg-slate-200 even:bg-slate-50">
            A
          </div>
        ))} */}
        {[...new Array(crossword.size.cols * crossword.size.rows)].map(
          (_, i) => {
            return (
              <div
                className={`border-[0.8px] border-gray-400 relative w-full h-full items-center flex font-medium text-2xl ${
                  crossword.grid[i] === "." && "bg-black"
                }`}
              >
                <div className="text-[11px] leading-[10px] m-0 p-0 absolute top-[2px] left-[2px] font-semibold">
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
