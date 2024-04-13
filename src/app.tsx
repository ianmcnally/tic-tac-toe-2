import React, { useState } from "react"
import styles from "./app.module.css"

function Board({ children }: any) {
  return <div className={styles.board}>{children}</div>
}

function Tile({ children, onClick }: any) {
  return (
    <div className={styles.tile} onClick={onClick}>
      {children}
    </div>
  )
}

function checkIfWinner(
  character: string,
  row: number,
  column: number,
  tiles: any[]
) {
  const horizontal =
    tiles[row][(column + 1) % 3] === character &&
    tiles[row][(column + 2) % 3] === character
  const vertical =
    tiles[(row + 1) % 3][column] === character &&
    tiles[(row + 2) % 3][column] === character
  const diagonal =
    tiles[(row + 1) % 3][(column + 1) % 3] === character &&
    tiles[(row + 2) % 3][(column + 1) % 3] === character

  return horizontal || vertical || diagonal
}

function checkComplete(tiles: any[]) {
  return tiles
    .map((row) => row.every((c: any) => c !== undefined))
    .every(Boolean)
}

function emptyBoard(): any[] {
  const emptyRow = Array(3).fill(undefined)
  return [[...emptyRow], [...emptyRow], [...emptyRow]]
}

export function App() {
  const [tiles, setTiles] = useState(emptyBoard())
  const [character, setCharacter] = useState("X")
  const [winner, setWinner] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  function startOver() {
    setCharacter("X")
    setWinner("")
    setIsComplete(false)
    setTiles(emptyBoard())
  }

  function setCurrentTile(rowIndex: number, columnIndex: number) {
    if (winner || isComplete) {
      return
    }

    tiles[rowIndex][columnIndex] = character
    setTiles([...tiles])

    if (checkIfWinner(character, rowIndex, columnIndex, tiles)) {
      setWinner(character)
    } else if (checkComplete(tiles)) {
      setIsComplete(true)
    } else {
      const nextCharacter = character === "X" ? "O" : "X"
      setCharacter(nextCharacter)
    }
  }

  return (
    <>
      {isComplete ? <p>Game over</p> : null}
      {winner ? <p>Winner is: {winner}</p> : null}
      {!isComplete && !winner ? <p>Current player: {character}</p> : null}
      <button type="button" onClick={startOver}>
        Start over
      </button>
      <Board>
        {tiles.map((row, rowIndex) =>
          row.map((tile: any, columnIndex: number) => (
            <Tile
              key={columnIndex}
              onClick={() => setCurrentTile(rowIndex, columnIndex)}
            >
              {tile}
            </Tile>
          ))
        )}
      </Board>
    </>
  )
}
