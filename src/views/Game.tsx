import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Board from "../components/Board";
import BoardFooter from "../components/BoardFooter";
import BoardHeader from "../components/BoardHeader";
import EndModal from "../components/EndModal";
import Modal from "../components/Modal";
import { compareTiles } from "../helpers/compareTiles";
import shuffle from "../helpers/shuffleArray";
import { PlayerData, Settings, SizeOfTheBoard, Tile } from "../types";

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
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState(1);
  const [time, setTime] = useState(0);
  const [delay, setDelay] = useState<number | null>(1000);
  const [foundTiles, setFoundTiles] = useState<Tile[]>([]);
  const [showModal, setShowModal] = useState(false);

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

    if (currentPlayerId < props.settings.players) {
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

  function resetBoard() {
    setBoard(generateBoard(props.settings.boardSize));
  }

  useEffect(() => {
    initPlayersData();
    setCurrentPlayerId(1);
    setTime(0);
    setDelay(1000);
    setFoundTiles([]);
  }, [board]);

  useEffect(() => {
    resetBoard();
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

    setTimeout(() => {
      setShowModal(isFinishedRef.current);
    }, 600);
    setDelay(null);

    return () => {
      setShowModal(false);
    };
  }, [isGameFinished]);

  const isSinglePlayer = props.settings.players === 1;
  return (
    <>
      <div className="py-8 px-20 flex flex-col justify-between h-screen">
        <BoardHeader
          formattedTime={formattedTime}
          isSinglePlayer={isSinglePlayer}
          resetBoard={resetBoard}
        />

        <Board
          board={board}
          foundTiles={foundTiles}
          tilesFound={tilesFound}
          nextPlayer={nextPlayer}
        />

        <BoardFooter
          formattedTime={formattedTime}
          isSinglePlayer={isSinglePlayer}
          playersData={playersData}
          currentPlayerId={currentPlayerId}
        />
      </div>

      {showModal && (
        <EndModal
          setShowModal={setShowModal}
          formattedTime={formattedTime}
          playersData={playersData}
          isSinglePlayer={isSinglePlayer}
          resetBoard={resetBoard}
        />
      )}
    </>
  );
}
