import { useEffect, useState } from "react";
import className from "classnames";
import { Tile } from "../types";
import { compareTiles } from "../helpers/compareTiles";

interface Props {
  board: Array<number[]>;
  nextPlayer: () => void;
  tilesFound: (first: Tile, second: Tile) => void;
  foundTiles: Tile[];
}

export default function Board({
  board,
  nextPlayer,
  tilesFound,
  foundTiles,
}: Props) {
  const [firstTile, setFirstTile] = useState<Tile | null>(null);
  const [secondTile, setSecondTile] = useState<Tile | null>(null);

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
    // Prevent duplicated selection of first selected tile
    if (
      secondTile ||
      (firstTile.xIndex === tile.xIndex && firstTile.yIndex === tile.yIndex)
    ) {
      return;
    }

    setSecondTile(tile);
  }

  useEffect(() => {
    if (!secondTile || !firstTile) {
      return;
    }

    if (firstTile.value === secondTile.value) {
      tilesFound(firstTile, secondTile);
    }

    setTimeout(() => {
      setFirstTile(null);
      setSecondTile(null);

      nextPlayer();
    }, 600);
  }, [secondTile]);

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
