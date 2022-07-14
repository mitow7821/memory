import { useEffect, useState } from "react";
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

  useEffect(() => {
    setBoard(generateBoard(props.settings.boardSize));

    return () => {
      setBoard([]);
    };
  }, []);

  return <Board board={board} />;
}
