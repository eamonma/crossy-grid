import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import Crossword from "./components/Crossword"
import { CrosswordData } from "./components/CrosswordGrid"
import puzzleData from "./test.json"

function App() {
  const [crosswordData, setCrosswordData] = useState<CrosswordData>(puzzleData)
  const [inputCrossword, setInputCrossword] = useState("")
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  })

  useEffect(() => {
    if (!acceptedFiles.length) return
    ;(async () => {
      const reader = new FileReader()
      console.log(acceptedFiles[0])
      reader.readAsText(acceptedFiles[0])

      reader.onload = (result) => {
        if (!result) return
        setCrosswordData(JSON.parse(result.target!.result as string))
        setInputCrossword(result.target?.result as string)
      }
    })()
  }, [acceptedFiles])

  return (
    <div className="App">
      <Crossword crossword={crosswordData as CrosswordData} />
      <section className="border-dashed border-4 m-4 text-xl">
        <div {...getRootProps({ className: "dropzone p-7 cursor-pointer" })}>
          <input {...getInputProps()} />
          <p>Drag and drop a compliant JSON file</p>
        </div>
      </section>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setCrosswordData(JSON.parse(inputCrossword) as CrosswordData)
        }}
        className="m-4"
      >
        <label className="flex flex-col gap-2">
          <span className="text-2xl">Input JSON</span>
          <textarea
            id="json-input"
            className="rounded-xl p-3 w-22 border-2 z-10 font-mono min-h-[100px]"
            onChange={(e) => setInputCrossword(e.target.value)}
            value={inputCrossword}
          />
        </label>
        <div className="mt-4">
          <button
            className="rounded-xl bg-zinc-200 p-2 px-4 font-medium hover:bg-zinc-100 transition"
            id="input-json-button"
            type="submit"
          >
            Input JSON
          </button>
          <button
            className="rounded-xl bg-zinc-200 p-2 px-4 font-medium hover:bg-zinc-100 transition mx-4"
            onClick={() => setInputCrossword("")}
          >
            Clear
          </button>
          <button
            className="rounded-xl bg-zinc-200 p-2 px-4 font-medium hover:bg-zinc-100 transition mx-4 ml-0"
            onClick={() =>
              setInputCrossword(
                JSON.stringify(JSON.parse(inputCrossword), undefined, 2)
              )
            }
          >
            Format
          </button>
        </div>
      </form>
      <p className="m-4 mt-8 text-black text-opacity-70">
        &copy; 2022 Eamon Ma. A renderer for{" "}
        <a href="https://www.xwordinfo.com/JSON/" className="text-blue-500">
          this JSON crossword format
        </a>
        , meant to be used with Puppeteer.{" "}
        <a
          href="https://github.com/eamonma/crossword"
          className="text-blue-500"
        >
          GitHub
        </a>
      </p>
    </div>
  )
}

export default App
