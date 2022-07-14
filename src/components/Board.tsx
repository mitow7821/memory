import { useState } from "react";
import className from "classnames";

interface Props {
  board: Array<number[]>;
}

interface SelectedTile {
  value: number;
  yIndex: number;
  xIndex: number;
}

export default function Board({ board }: Props) {
  const [firstTile, setFirstTile] = useState<SelectedTile | null>(null);
  const [secondTile, setSecondTile] = useState<SelectedTile | null>(null);
  const [points, setPoints] = useState(0);
  const [foundTiles, setFoundTiles] = useState<number[]>([]);

  function resetSelectedTiles() {
    setFirstTile(null);
    setSecondTile(null);
  }

  function compareTiles() {
    if (firstTile && secondTile && firstTile.value === secondTile.value) {
      setPoints((e) => e + 1);

      setFoundTiles((f) => [...f, firstTile.value]);
    }

    setTimeout(() => {
      resetSelectedTiles();
    }, 1000);
  }

  function onTileClick(tile: SelectedTile) {
    console.log(tile);
    if (!firstTile) {
      setFirstTile(tile);

      return;
    }

    setSecondTile(tile);
    console.log(secondTile);
    compareTiles();
  }

  const isTileSelected = (tile: SelectedTile) =>
    [firstTile, secondTile].some(
      (e) =>
        e?.value === tile.value &&
        e?.xIndex === tile.xIndex &&
        e?.yIndex === tile.yIndex
    );

  const isTileFound = (value: number) => foundTiles.includes(value);

  return (
    <>
      {points}
      {JSON.stringify(firstTile)}
      {JSON.stringify(secondTile)}
      <div className="flex flex-col gap-3">
        {board.map((row, yIndex) => (
          <div className="flex gap-5" key={yIndex}>
            {row.map((value, xIndex) => {
              const tile = { value, xIndex, yIndex };

              return (
                <div
                  key={xIndex}
                  onClick={() => onTileClick(tile)}
                  className={
                    "bg-gray-100 w-10 h-10" +
                    className({
                      "bg-red-500": isTileSelected(tile),
                      "bg-green-500": isTileFound(tile.value),
                    })
                  }
                >
                  {(isTileFound(tile.value) || isTileSelected(tile)) && value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
