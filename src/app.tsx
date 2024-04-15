import React, { useReducer, useState } from "react"
import styles from "./app.module.css"

function checkIfWinner(
  character: string,
  row: number,
  column: number,
  tiles: any[]
) {
  function tilesAreCharacter(...tiles: any[]) {
    return tiles.every((tile) => tile === character)
  }

  const horizontal = tilesAreCharacter(
    tiles[row][(column + 1) % 3],
    tiles[row][(column + 2) % 3]
  )

  const vertical = tilesAreCharacter(
    tiles[(row + 1) % 3][column],
    tiles[(row + 2) % 3][column]
  )

  const diagonal =
    tilesAreCharacter(tiles[1][1]) &&
    (tilesAreCharacter(tiles[0][0], tiles[2][2]) ||
      tilesAreCharacter(tiles[0][2], tiles[2][0]))

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

const initialState = {
  character: "X",
  isOutOfTurns: false,
  winner: "",
  tiles: emptyBoard(),
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "turn": {
      const { character } = state
      const { column, row } = action
      const tiles = [...state.tiles]

      tiles[action.row][action.column] = state.character

      const isWinner = checkIfWinner(character, row, column, tiles)
      const isComplete = !isWinner && checkComplete(tiles)

      return {
        ...state,
        tiles,
        character: character === "X" ? "O" : "X",
        winner: isWinner ? character : "",
        isOutOfTurns: isComplete,
      }
    }
    case "restart": {
      return {
        ...state,
        character: "X",
        winner: "",
        isOutOfTurns: false,
        tiles: emptyBoard(),
      }
    }
    default:
      return state
  }
}

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { character, winner, isOutOfTurns, tiles } = state

  function startOver() {
    dispatch({ type: "restart" })
  }

  function setCurrentTile(row: number, column: number) {
    if (winner || isOutOfTurns) {
      return
    }

    dispatch({ type: "turn", row, column })
  }

  return (
    <>
      {isOutOfTurns ? <p>Game over</p> : null}
      {winner ? <p>Winner is: {winner}</p> : null}
      {!isOutOfTurns && !winner ? <p>Current player: {character}</p> : null}
      <button type="button" onClick={startOver}>
        Start over
      </button>
      <Board>
        {tiles.map((row: any, rowIndex: number) =>
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
