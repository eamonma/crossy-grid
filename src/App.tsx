import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import Crossword from "./components/Crossword"
import { CrosswordData } from "./components/CrosswordGrid"
import puzzleData from "./test.json"

function App() {
  const [crosswordData, setCrosswordData] = useState<CrosswordData>(puzzleData)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  })

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  console.log(acceptedFiles)

  useEffect(() => {
    if (!acceptedFiles.length) return
    ;(async () => {
      const reader = new FileReader()
      console.log(acceptedFiles[0])
      reader.readAsText(acceptedFiles[0])

      reader.onload = (result) => {
        if (!result) return
        setCrosswordData(JSON.parse(result.target!.result as string))
      }
    })()
  }, [acceptedFiles])

  return (
    <div className="App">
      <Crossword crossword={crosswordData as CrosswordData} />
      <section className="border-dashed border-4 m-4 p-4">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag and drop a compliant JSON file</p>
        </div>
      </section>
      <p className="m-4 mt-8 text-black text-opacity-70">
        &copy; 2022 Eamon Ma. A renderer for{" "}
        <a href="https://www.xwordinfo.com/JSON/" className="text-blue-500">
          this JSON crossword format
        </a>
        .{" "}
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
