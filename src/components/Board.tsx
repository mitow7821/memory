import { useEffect, useState } from "react";
import className from "classnames";

interface Props {
  board: Array<number[]>;
  currentPlayer: number;
  setPlayersScore: React.Dispatch<React.SetStateAction<number[]>>;
  nextPlayer: () => void;
  stopTimer: () => void;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
}

interface Tile {
  value: number;
  yIndex: number;
  xIndex: number;
}

export default function Board({
  board,
  nextPlayer,
  setPlayersScore,
  currentPlayer,
  stopTimer,
  setMoves,
}: Props) {
  const [firstTile, setFirstTile] = useState<Tile | null>(null);
  const [secondTile, setSecondTile] = useState<Tile | null>(null);
  const [foundTiles, setFoundTiles] = useState<Tile[]>([]);

  function resetSelectedTiles() {
    setFirstTile(null);
    setSecondTile(null);
  }

  function onTileClick(tile: Tile) {
    // Prevent found tiles selection
    if (isTileFound(tile)) {
      return;
    }

    if (!firstTile) {
      setFirstTile(tile);

      return;
    }

    // Prevent selection while reset function is about to run (timeout)
    // Prevent selection of first selected tile
    if (
      secondTile ||
      (firstTile.xIndex === tile.xIndex && firstTile.yIndex === tile.yIndex)
    ) {
      return;
    }

    setSecondTile(tile);
  }

  function addPointForCurrentPlayer() {
    setPlayersScore((prev) => {
      const scores = [...prev];
      scores[currentPlayer] += 1;

      return scores;
    });
  }

  useEffect(() => {
    if (!secondTile || !firstTile) {
      return;
    }

    if (firstTile.value === secondTile.value) {
      setFoundTiles((f) => [...f, firstTile, secondTile]);
      addPointForCurrentPlayer();
    }

    setMoves((e) => e + 1);

    setTimeout(() => {
      resetSelectedTiles();
      nextPlayer();
    }, 600);
  }, [secondTile]);

  const compareTiles = (firstTile: Tile | null, secondTile: Tile | null) =>
    firstTile?.value === secondTile?.value &&
    firstTile?.xIndex === secondTile?.xIndex &&
    firstTile?.yIndex === secondTile?.yIndex;

  const allTiles = board.reduce<Tile[]>((acc, row, yIndex) => {
    row.forEach((value, xIndex) => {
      acc.push({ value, yIndex, xIndex });
    });

    return acc;
  }, []);

  const isFinished = allTiles.every((tile) =>
    foundTiles.some((e) => compareTiles(e, tile))
  );

  useEffect(() => {
    if (!isFinished) {
      return;
    }

    stopTimer();
  }, [isFinished]);

  const isTileSelected = (tile: Tile) =>
    [firstTile, secondTile].some((e) => compareTiles(e, tile));

  const isTileFound = (tile: Tile | null) =>
    foundTiles.some((e) => compareTiles(e, tile));

  return (
    <div className="flex flex-col gap-3.5 justify-self-center mx-auto w-min">
      {board.map((row, yIndex) => (
        <div className="flex gap-4" key={yIndex}>
          {row.map((value, xIndex) => {
            const tile = { value, xIndex, yIndex };

            return (
              <div
                className="grid w-16 h-16 place-content-center relative"
                key={xIndex}
              >
                <div
                  onClick={() => onTileClick(tile)}
                  className={`rounded-full bg-dark w-16 h-16 grid place-content-center transition-transform duration-500 ${className(
                    {
                      "bg-accent": isTileSelected(tile),
                      "bg-secondary": isTileFound(tile),
                    }
                  )}`}
                  style={{
                    transform:
                      isTileSelected(tile) || isTileFound(tile)
                        ? "rotateY(180deg)"
                        : "",
                  }}
                ></div>

                <span className={"center text-white text-2xl"}>
                  {(isTileFound(tile) || isTileSelected(tile)) && value}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
