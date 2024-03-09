import '../styles/tictactoe.css'
import React, { useState, ReactElement } from 'react'

type Props = {
  squares: Array<string>
  finished: boolean
  onClick: (i: number) => void
}
const Board: React.FC<Props> = (props) => {
  const renderSquare = (i: number) => (
    <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  )
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}
type Propos = {
  value: string
  onClick: () => void
}
const Square: React.FC<Propos> = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function TicTacToe() {
  const [history, setHistory] = useState([{ squares: new Array(9) }])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const [finished, setFinished] = useState(false)
  const handleClick = (i: number) => {
    if (finished) {
      return
    }
    if (stepNumber >= 9) {
      setFinished(true)
      return
    }
    const _history = history.slice(0, stepNumber + 1)
    const squares = [..._history[_history.length - 1].squares]
    console.log('history:', _history.length, stepNumber)
    if (squares[i]) {
      return
    }
    const winner = calculateWinner(squares)
    if (winner) {
      setFinished(true)
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory([..._history, { squares }])
    setStepNumber(_history.length)
    setXIsNext(!xIsNext)
  }
  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
    setFinished(false)
  }
  const _history = [...history]
  const squares = [..._history[stepNumber].squares]
  const winner = calculateWinner(squares)
  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : 'O')
  const moves = _history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })
  return (
    <div className="game">
      <Board
        squares={squares}
        finished={finished}
        onClick={(i) => handleClick(i)}
      />
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
function calculateWinner(squares: Array<string>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  const length = lines.length
  for (let i = 0; i < length; i++) {
    const [a, b, c] = lines[i]
    const player = squares[a]
    if (player && player === squares[b] && player === squares[c]) {
      return player
    }
  }
  return null
}

export default TicTacToe
