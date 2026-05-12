'use client'

import { RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'

const size = 8
const targetScore = 5

function keyOf(x: number, y: number) {
  return `${x}:${y}`
}

const initialSignals: Array<[number, number]> = [
  [1, 2],
  [5, 1],
  [6, 5],
  [2, 6],
  [4, 4],
]

const signalCells = new Set(initialSignals.map(([x, y]) => keyOf(x, y)))
const noiseCells = new Set(['3:1', '5:3', '1:5', '6:6', '0:4', '4:6'])

type GameState = {
  collected: string[]
  moves: number
  player: [number, number]
  status: 'playing' | 'won' | 'lost'
}

const initialState: GameState = {
  collected: [],
  moves: 0,
  player: [0, 0],
  status: 'playing',
}

function movePlayer(state: GameState, dx: number, dy: number): GameState {
  if (state.status !== 'playing') {
    return state
  }

  const nextX = Math.max(0, Math.min(size - 1, state.player[0] + dx))
  const nextY = Math.max(0, Math.min(size - 1, state.player[1] + dy))

  if (nextX === state.player[0] && nextY === state.player[1]) {
    return state
  }

  const nextKey = keyOf(nextX, nextY)
  const nextCollected = signalCells.has(nextKey)
    ? Array.from(new Set([...state.collected, nextKey]))
    : state.collected
  const lost = noiseCells.has(nextKey)
  const won = nextCollected.length >= targetScore

  return {
    collected: nextCollected,
    moves: state.moves + 1,
    player: [nextX, nextY],
    status: lost ? 'lost' : won ? 'won' : 'playing',
  }
}

export function ForestSignalGame() {
  const [state, setState] = useState<GameState>(initialState)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const keyMap: Record<string, [number, number] | undefined> = {
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        ArrowUp: [0, -1],
        a: [-1, 0],
        d: [1, 0],
        s: [0, 1],
        w: [0, -1],
      }
      const delta = keyMap[event.key]

      if (!delta) {
        return
      }

      event.preventDefault()
      setState((current) => movePlayer(current, delta[0], delta[1]))
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const message =
    state.status === 'won'
      ? 'Signal recovered. The forest answers.'
      : state.status === 'lost'
        ? 'Noise swallowed the route. Restart the field.'
        : 'Collect five signals and avoid noise.'

  return (
    <article className="game-shell">
      <div className="game-status">
        <div>
          <span>Signals</span>
          <strong>
            {state.collected.length}/{targetScore}
          </strong>
        </div>
        <div>
          <span>Moves</span>
          <strong>{state.moves}</strong>
        </div>
        <button aria-label="Restart Forest Signal" onClick={() => setState(initialState)} type="button">
          <RotateCcw aria-hidden="true" size={18} />
        </button>
      </div>

      <div aria-label="Forest Signal board" className="game-board" role="grid">
        {Array.from({ length: size * size }).map((_, index) => {
          const x = index % size
          const y = Math.floor(index / size)
          const key = keyOf(x, y)
          const isPlayer = state.player[0] === x && state.player[1] === y
          const isSignal = signalCells.has(key)
          const isCollected = state.collected.includes(key)
          const isNoise = noiseCells.has(key)

          return (
            <div
              aria-label={`${x + 1}, ${y + 1}`}
              className="game-cell"
              data-collected={isCollected}
              data-noise={isNoise}
              data-player={isPlayer}
              data-signal={isSignal && !isCollected}
              key={key}
              role="gridcell"
            />
          )
        })}
      </div>

      <p>{message}</p>

      <div className="game-controls" aria-label="Game controls">
        <button onClick={() => setState((current) => movePlayer(current, 0, -1))} type="button">
          Up
        </button>
        <button onClick={() => setState((current) => movePlayer(current, -1, 0))} type="button">
          Left
        </button>
        <button onClick={() => setState((current) => movePlayer(current, 1, 0))} type="button">
          Right
        </button>
        <button onClick={() => setState((current) => movePlayer(current, 0, 1))} type="button">
          Down
        </button>
      </div>
    </article>
  )
}
