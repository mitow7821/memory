import { useEffect, useState } from "react";
import className from "classnames";

interface Props {
  board: Array<number[]>;
  currentPlayer: number;
  setPlayersScore: React.Dispatch<React.SetStateAction<number[]>>;
  nextPlayer: () => void;
}

interface SelectedTile {
  value: number;
  yIndex: number;
  xIndex: number;
}

export default function Board({
  board,
  nextPlayer,
  setPlayersScore,
  currentPlayer,
}: Props) {
  const [firstTile, setFirstTile] = useState<SelectedTile | null>(null);
  const [secondTile, setSecondTile] = useState<SelectedTile | null>(null);
  const [foundTiles, setFoundTiles] = useState<number[]>([]);

  function resetSelectedTiles() {
    setFirstTile(null);
    setSecondTile(null);
  }

  function onTileClick(tile: SelectedTile) {
    console.log(tile);
    if (!firstTile) {
      setFirstTile(tile);

      return;
    }

    setSecondTile(tile);
  }

  useEffect(() => {
    if (!secondTile || !firstTile) {
      return;
    }

    if (firstTile.value === secondTile.value) {
      setFoundTiles((f) => [...f, firstTile.value]);
      setPlayersScore((prev) => {
        const scores = [...prev];
        scores[currentPlayer] += 1;

        return scores;
      });
    }

    setTimeout(() => {
      resetSelectedTiles();
      nextPlayer();
    }, 500);
  }, [secondTile, firstTile]);

  const isTileSelected = (tile: SelectedTile) =>
    [firstTile, secondTile].some(
      (e) =>
        e?.value === tile.value &&
        e?.xIndex === tile.xIndex &&
        e?.yIndex === tile.yIndex
    );

  const isTileFound = (value: number) => foundTiles.includes(value);

  return (
    <div className="flex flex-col gap-3.5 justify-self-center mx-auto w-min">
      {board.map((row, yIndex) => (
        <div className="flex gap-4" key={yIndex}>
          {row.map((value, xIndex) => {
            const tile = { value, xIndex, yIndex };

            return (
              <div
                key={xIndex}
                onClick={() => onTileClick(tile)}
                className={`rounded-full bg-dark w-16 h-16 grid place-content-center text-white text-2xl ${className(
                  {
                    "!bg-accent": isTileSelected(tile),
                    "bg-secondary": isTileFound(tile.value),
                  }
                )}`}
              >
                {(isTileFound(tile.value) || isTileSelected(tile)) && value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
