import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Board from "../components/Board";
import shuffle from "../helpers/shuffleArray";
import { Settings, SizeOfTheBoard } from "../types";

interface Props {
  settings: Settings;
}

function generateBoard(boardSize: SizeOfTheBoard) {
  const numberOfTiles = Math.pow(boardSize, 2);

  const halfOfTiles = Array.from(Array(numberOfTiles / 2).keys());
  const tiles = shuffle([...halfOfTiles, ...halfOfTiles]);

  const newBoard = [];

  for (let i = 0; i < boardSize; i++) {
    let row: number[] = [];

    for (let i = 0; i < boardSize; i++) {
      const tile = tiles.pop();

      if (tile != null) {
        row.push(tile);
      }
    }

    newBoard.push(row);
  }

  return newBoard;
}

export default function Game(props: Props) {
  const [board, setBoard] = useState<Array<number[]>>([]);
  const [playersScore, setPlayersScore] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  function nextPlayer() {
    if (currentPlayer + 1 < props.settings.players) {
      console.log("run");
      setCurrentPlayer((e) => e + 1);

      return;
    }

    setCurrentPlayer(0);
  }

  useEffect(() => {
    setBoard(generateBoard(props.settings.boardSize));
    for (let i = 0; i < props.settings.players; i++) {
      setPlayersScore((e) => [...e, 0]);
    }

    return () => {
      setBoard([]);
      setPlayersScore([]);
    };
  }, []);

  return (
    <div className="py-10 px-20 flex flex-col justify-between h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-primary text-[1.7rem] font-semibold">memory</h1>

        <div className="flex gap-3">
          <button
            className="bg-accent text-white rounded-full py-2 px-6 text-sm font-semibold"
            onClick={() => setBoard(generateBoard(props.settings.boardSize))}
          >
            Restart
          </button>

          <Link
            to="/"
            className="bg-gray text-primary rounded-full py-2 px-5 text-sm font-semibold"
          >
            New Game
          </Link>
        </div>
      </div>

      <Board
        board={board}
        setPlayersScore={setPlayersScore}
        nextPlayer={nextPlayer}
        currentPlayer={currentPlayer}
      />

      <div className="flex gap-5 justify-center">
        {playersScore.map((playerScore, index) => (
          <div className="relative w-1/4">
            <div
              className={`z-10 flex gap-3 whitespace-nowrap items-center justify-between py-2 px-4 rounded-md ${
                index === currentPlayer
                  ? "bg-accent text-white after:bg-accent after:w-5 after:h-5 after:-top-2 after:rotate-45 after:left-1/2 after:-translate-x-1/2 after:absolute"
                  : "bg-secondary text-dark"
              }`}
            >
              <span className="text-sm mt-0.5 font-medium">
                Player {++index}
              </span>

              <h2 className="font-semibold text-xl">{playerScore}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
