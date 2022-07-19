import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Board from "../components/Board";
import Modal from "../components/Modal";
import { compareTiles } from "../helpers/compareTiles";
import shuffle from "../helpers/shuffleArray";
import { Settings, SizeOfTheBoard, Tile } from "../types";

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

interface PlayerData {
  id: number;
  score: number;
  moves: number;
}

export default function Game(props: Props) {
  const [board, setBoard] = useState<Array<number[]>>([]);
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState(1);
  const [time, setTime] = useState(0);
  const [delay, setDelay] = useState<number | null>(1000);
  const [foundTiles, setFoundTiles] = useState<Tile[]>([]);

  const formattedTime = new Date(time * 1000).toISOString().slice(14, 19);
  const allTiles = useMemo(
    () =>
      board.reduce<Tile[]>((acc, row, yIndex) => {
        row.forEach((value, xIndex) => {
          acc.push({ value, yIndex, xIndex });
        });

        return acc;
      }, []),
    [board]
  );

  const currentPlayerData = playersData.find(
    ({ id }) => id === currentPlayerId
  );

  const isGameFinished = useMemo(
    () =>
      allTiles.every((tile) => foundTiles.some((e) => compareTiles(e, tile))),
    [allTiles, foundTiles]
  );

  const isFinishedRef = useRef(false);
  isFinishedRef.current = isGameFinished;

  function setPlayerData(
    cb: (data: PlayerData) => Partial<PlayerData>,
    playerId = currentPlayerId
  ) {
    setPlayersData((e) =>
      e.map((data) => (data.id === playerId ? { ...data, ...cb(data) } : data))
    );
  }

  function addMove() {
    setPlayerData(({ moves }) => ({ moves: moves + 1 }));
  }

  function addPoint() {
    setPlayerData(({ score }) => ({ score: score + 1 }));
  }

  function nextPlayer() {
    addMove();

    if (isFinishedRef.current) {
      return;
    }

    if (currentPlayerId - 1 < props.settings.players) {
      setCurrentPlayerId((e) => e + 1);

      return;
    }

    setCurrentPlayerId(1);
  }

  function tilesFound(firstTile: Tile, secondTile: Tile) {
    setFoundTiles((f) => [...f, firstTile, secondTile]);
    addPoint();
  }

  function initPlayersData() {
    setPlayersData([]);
    for (let i = 0; i < props.settings.players; i++) {
      setPlayersData((data) => [...data, { score: 0, moves: 0, id: i + 1 }]);
    }
  }

  useEffect(() => {
    initPlayersData();
    setCurrentPlayerId(1);
    setTime(0);
    setDelay(1000);
    setFoundTiles([]);
  }, [board]);

  useEffect(() => {
    setBoard(generateBoard(props.settings.boardSize));
    initPlayersData();

    setDelay(1000);

    return () => {
      setDelay(null);

      setBoard([]);
      setPlayersData([]);
    };
  }, []);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        setTime((e) => e + 1);
      }, delay);

      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);

  useEffect(() => {
    if (!isGameFinished) {
      return;
    }

    setDelay(null);
  }, [isGameFinished]);

  return (
    <>
      <div className="py-10 px-20 flex flex-col justify-between h-screen">
        <div
          className={`grid  items-center ${
            props.settings.players !== 1 ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          <h1 className="text-primary text-[1.7rem] font-semibold">memory</h1>

          {props.settings.players !== 1 && (
            <h2 className="font-semibold text-lg text-primary justify-self-center">
              Time: {formattedTime}
            </h2>
          )}

          <div className="flex gap-3 items-center justify-self-end">
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
          foundTiles={foundTiles}
          tilesFound={tilesFound}
          nextPlayer={nextPlayer}
        />

        <div className="flex gap-5 justify-center">
          {props.settings.players !== 1 ? (
            playersData.map(({ score, id }) => (
              <div
                className={`z-10 flex gap-3 whitespace-nowrap items-center justify-between py-2 px-4 rounded-md relative w-1/4 ${
                  id === currentPlayerId
                    ? "bg-accent text-white after:bg-accent after:w-5 after:h-5 after:-top-2 after:rotate-45 after:left-1/2 after:-translate-x-1/2 after:absolute"
                    : "bg-secondary text-dark"
                }`}
                key={id}
              >
                <span className="text-sm mt-0.5 font-medium">Player {id}</span>

                <h2 className="font-semibold text-xl">{score}</h2>
              </div>
            ))
          ) : (
            <>
              <div className="z-10 flex gap-3 whitespace-nowrap items-center justify-between py-2 px-4 rounded-md bg-secondary text-dark w-1/4 relative">
                <span className="text-sm mt-0.5 font-medium">Time</span>

                <h2 className="font-semibold text-xl">{formattedTime}</h2>
              </div>

              <div className="z-10 flex gap-3 whitespace-nowrap items-center justify-between py-2 px-4 rounded-md bg-secondary text-dark w-1/4 relative">
                <span className="text-sm mt-0.5 font-medium">Moves</span>

                <h2 className="font-semibold text-xl">
                  {currentPlayerData?.moves ?? 0}
                </h2>
              </div>
            </>
          )}
        </div>
      </div>

      {isGameFinished && (
        <Modal>
          <div className="flex flex-col justify-between flex-grow gap-3">
            <div>
              <h1 className="text-white/90 text-[1.35rem] font-semibold mt-0.5 mb-2">
                Koniec gry
              </h1>

              <div className="grid gap-3">
                {[...playersData]
                  .sort((a, b) => b.score - a.score)
                  .map(({ score, moves, id }) => (
                    <div
                      className={
                        "grid py-1.5 px-3 rounded-md bg-white text-primary"
                      }
                      key={id}
                    >
                      <span className="text-lg mt-0.5 pb-1 mb-1 font-semibold border-b border-black/25">
                        Player {id}
                      </span>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Score:</span>
                        <span className="font-medium">{score}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Moves:</span>
                        <span className="font-medium">{moves}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                className="bg-accent text-white rounded-full py-2 px-6 text-sm font-semibold"
                onClick={() =>
                  setBoard(generateBoard(props.settings.boardSize))
                }
              >
                Restart
              </button>

              <Link
                to="/"
                className="bg-white text-primary rounded-full py-2 px-5 text-sm font-semibold text-center"
              >
                New Game
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
