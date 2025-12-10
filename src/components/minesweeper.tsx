"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
} from "@/components/ui/window";

interface GermsweeperProps {
  onClose: () => void;
  onMinimize: () => void;
}

// Pixel art germ icon component
function GermIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Main germ body - green blob */}
      <rect x="5" y="3" width="4" height="1" fill="#4CAF50" />
      <rect x="4" y="4" width="6" height="1" fill="#4CAF50" />
      <rect x="3" y="5" width="8" height="4" fill="#4CAF50" />
      <rect x="4" y="9" width="6" height="1" fill="#4CAF50" />
      <rect x="5" y="10" width="4" height="1" fill="#4CAF50" />
      {/* Tentacles/flagella */}
      <rect x="2" y="4" width="1" height="2" fill="#66BB6A" />
      <rect x="1" y="3" width="1" height="1" fill="#66BB6A" />
      <rect x="11" y="4" width="1" height="2" fill="#66BB6A" />
      <rect x="12" y="3" width="1" height="1" fill="#66BB6A" />
      <rect x="3" y="10" width="1" height="2" fill="#66BB6A" />
      <rect x="10" y="10" width="1" height="2" fill="#66BB6A" />
      <rect x="6" y="11" width="1" height="2" fill="#66BB6A" />
      <rect x="2" y="7" width="1" height="1" fill="#66BB6A" />
      <rect x="11" y="7" width="1" height="1" fill="#66BB6A" />
      {/* Eyes */}
      <rect x="5" y="6" width="1" height="1" fill="#1a1a1a" />
      <rect x="8" y="6" width="1" height="1" fill="#1a1a1a" />
      {/* Angry eyebrows */}
      <rect x="4" y="5" width="2" height="1" fill="#2E7D32" />
      <rect x="8" y="5" width="2" height="1" fill="#2E7D32" />
    </svg>
  );
}

// Green checkmark icon component
function CheckmarkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Checkmark */}
      <rect x="2" y="6" width="2" height="2" fill="#4CAF50" />
      <rect x="4" y="7" width="2" height="2" fill="#4CAF50" />
      <rect x="6" y="5" width="2" height="2" fill="#4CAF50" />
      <rect x="8" y="3" width="2" height="2" fill="#4CAF50" />
      <rect x="10" y="1" width="1" height="2" fill="#4CAF50" />
    </svg>
  );
}

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

type GameState = "playing" | "won" | "lost";

const BOARD_WIDTH = 9;
const BOARD_HEIGHT = 9;
const MINE_COUNT = 10;

function createEmptyBoard(): CellState[][] {
  return Array(BOARD_HEIGHT)
    .fill(null)
    .map(() =>
      Array(BOARD_WIDTH)
        .fill(null)
        .map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        }))
    );
}

function placeMines(
  board: CellState[][],
  firstClickRow: number,
  firstClickCol: number
): void {
  let minesPlaced = 0;
  while (minesPlaced < MINE_COUNT) {
    const row = Math.floor(Math.random() * BOARD_HEIGHT);
    const col = Math.floor(Math.random() * BOARD_WIDTH);

    // Don't place mine on first click or adjacent to it
    const isNearFirstClick =
      Math.abs(row - firstClickRow) <= 1 && Math.abs(col - firstClickCol) <= 1;

    if (!board[row][col].isMine && !isNearFirstClick) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }
}

function calculateAdjacentMines(board: CellState[][]): void {
  for (let row = 0; row < BOARD_HEIGHT; row++) {
    for (let col = 0; col < BOARD_WIDTH; col++) {
      if (board[row][col].isMine) continue;

      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const newRow = row + dr;
          const newCol = col + dc;
          if (
            newRow >= 0 &&
            newRow < BOARD_HEIGHT &&
            newCol >= 0 &&
            newCol < BOARD_WIDTH &&
            board[newRow][newCol].isMine
          ) {
            count++;
          }
        }
      }
      board[row][col].adjacentMines = count;
    }
  }
}

function revealCell(
  board: CellState[][],
  row: number,
  col: number
): CellState[][] {
  const newBoard = board.map((r) => r.map((c) => ({ ...c })));

  function reveal(r: number, c: number) {
    if (
      r < 0 ||
      r >= BOARD_HEIGHT ||
      c < 0 ||
      c >= BOARD_WIDTH ||
      newBoard[r][c].isRevealed ||
      newBoard[r][c].isFlagged
    ) {
      return;
    }

    newBoard[r][c].isRevealed = true;

    if (newBoard[r][c].adjacentMines === 0 && !newBoard[r][c].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr !== 0 || dc !== 0) {
            reveal(r + dr, c + dc);
          }
        }
      }
    }
  }

  reveal(row, col);
  return newBoard;
}

function checkWin(board: CellState[][]): boolean {
  for (let row = 0; row < BOARD_HEIGHT; row++) {
    for (let col = 0; col < BOARD_WIDTH; col++) {
      const cell = board[row][col];
      if (!cell.isMine && !cell.isRevealed) {
        return false;
      }
    }
  }
  return true;
}

const NUMBER_COLORS: Record<number, string> = {
  1: "#0000FF",
  2: "#008000",
  3: "#FF8C00",  // Orange instead of red
  4: "#000080",
  5: "#800000",
  6: "#008080",
  7: "#000000",
  8: "#808080",
};

export function Germsweeper({ onClose, onMinimize }: GermsweeperProps) {
  const [board, setBoard] = useState<CellState[][]>(createEmptyBoard);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [flagCount, setFlagCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && gameState === "playing") {
      interval = setInterval(() => {
        setTime((t) => Math.min(t + 1, 999));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, gameState]);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setGameState("playing");
    setIsFirstClick(true);
    setFlagCount(0);
    setTime(0);
    setIsTimerRunning(false);
  }, []);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (gameState !== "playing") return;

      const cell = board[row][col];
      if (cell.isRevealed || cell.isFlagged) return;

      let newBoard = board;

      if (isFirstClick) {
        newBoard = board.map((r) => r.map((c) => ({ ...c })));
        placeMines(newBoard, row, col);
        calculateAdjacentMines(newBoard);
        setIsFirstClick(false);
        setIsTimerRunning(true);
      }

      if (newBoard[row][col].isMine) {
        // Game over - reveal all mines
        const lostBoard = newBoard.map((r) =>
          r.map((c) => ({
            ...c,
            isRevealed: c.isMine ? true : c.isRevealed,
          }))
        );
        setBoard(lostBoard);
        setGameState("lost");
        setIsTimerRunning(false);
        return;
      }

      const revealedBoard = revealCell(newBoard, row, col);
      setBoard(revealedBoard);

      if (checkWin(revealedBoard)) {
        setGameState("won");
        setIsTimerRunning(false);
      }
    },
    [board, gameState, isFirstClick]
  );

  const handleRightClick = useCallback(
    (e: React.MouseEvent, row: number, col: number) => {
      e.preventDefault();
      if (gameState !== "playing") return;

      const cell = board[row][col];
      if (cell.isRevealed) return;

      const newBoard = board.map((r) => r.map((c) => ({ ...c })));
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      setBoard(newBoard);
      setFlagCount((prev) => prev + (newBoard[row][col].isFlagged ? 1 : -1));
    },
    [board, gameState]
  );

  const formatNumber = (n: number) => String(n).padStart(3, "0");

  const getFaceEmoji = () => {
    if (gameState === "won") return "😎";
    if (gameState === "lost") return "😵";
    return "🙂";
  };

  return (
    <Window className="absolute top-[15vh] left-[30vw] flex flex-col">
      <WindowTitleBar>
        <WindowTitle>Germsweeper</WindowTitle>
        <WindowControls showMaximize={false} onClose={onClose} onMinimize={onMinimize} />
      </WindowTitleBar>

      <div className="bg-[#c0c0c0] p-2">
        {/* Header with counters and reset button */}
        <div
          className="flex justify-between items-center p-1 mb-2"
          style={{
            backgroundColor: "#c0c0c0",
            boxShadow:
              "inset -2px -2px #fff, inset 2px 2px #808080",
          }}
        >
          {/* Mine counter */}
          <div
            className="font-mono text-xl font-bold px-1"
            style={{
              backgroundColor: "#000",
              color: "#ff0000",
              fontFamily: "monospace",
              minWidth: "45px",
              textAlign: "center",
            }}
          >
            {formatNumber(MINE_COUNT - flagCount)}
          </div>

          {/* Reset button */}
          <button
            onClick={resetGame}
            className="text-xl px-2 py-0.5 active:pt-1 active:pb-0"
            style={{
              backgroundColor: "#c0c0c0",
              boxShadow:
                "inset -1px -1px #808080, inset 1px 1px #fff, inset -2px -2px #404040, inset 2px 2px #dfdfdf",
              minWidth: "32px",
            }}
          >
            {getFaceEmoji()}
          </button>

          {/* Timer */}
          <div
            className="font-mono text-xl font-bold px-1"
            style={{
              backgroundColor: "#000",
              color: "#ff0000",
              fontFamily: "monospace",
              minWidth: "45px",
              textAlign: "center",
            }}
          >
            {formatNumber(time)}
          </div>
        </div>

        {/* Game board */}
        <div
          className="inline-block"
          style={{
            backgroundColor: "#c0c0c0",
            boxShadow:
              "inset -2px -2px #fff, inset 2px 2px #808080, inset -3px -3px #dfdfdf, inset 3px 3px #404040",
            padding: "3px",
          }}
        >
          {board.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((cell, colIdx) => (
                <button
                  key={colIdx}
                  className="w-5 h-5 flex items-center justify-center text-xs font-bold border-0 p-0"
                  style={{
                    backgroundColor: cell.isRevealed ? "#c0c0c0" : "#c0c0c0",
                    boxShadow: cell.isRevealed
                      ? "inset 1px 1px #808080"
                      : "inset -1px -1px #808080, inset 1px 1px #fff, inset -2px -2px #404040, inset 2px 2px #dfdfdf",
                    color:
                      cell.adjacentMines > 0
                        ? NUMBER_COLORS[cell.adjacentMines]
                        : "transparent",
                    fontSize: "12px",
                    lineHeight: "20px",
                  }}
                  onClick={() => handleCellClick(rowIdx, colIdx)}
                  onContextMenu={(e) => handleRightClick(e, rowIdx, colIdx)}
                  disabled={cell.isRevealed && !cell.isMine}
                >
                  {cell.isFlagged && !cell.isRevealed && <CheckmarkIcon />}
                  {cell.isRevealed && cell.isMine && <GermIcon />}
                  {cell.isRevealed &&
                    !cell.isMine &&
                    cell.adjacentMines > 0 &&
                    cell.adjacentMines}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Game over message */}
        {gameState !== "playing" && (
          <div className="text-center mt-2 text-sm font-bold">
            {gameState === "won" ? "Area Sanitized! 🎉" : "Infected! 🦠"}
          </div>
        )}
      </div>
    </Window>
  );
}
