import type { Settings, TileStyle } from "../../types";
import { memo } from "react";

interface Props {
  tilesStyle: TileStyle;
  changeSettingValues: (e: Partial<Settings>) => void;
}

interface TileStyleOption {
  name: string;
  value: TileStyle;
}

export default memo(function TilesStyle({
  tilesStyle,
  changeSettingValues,
}: Props) {
  const tiles: TileStyleOption[] = [
    { name: "Numbers", value: "numbers" },
    { name: "Icons", value: "icons" },
  ];

  return (
    <div className="grid gap-2">
      <span className="text-prima ry/80 font-semibold">Select tiles style</span>

      <div className="grid grid-cols-2 gap-3">
        {tiles.map((tile) => {
          const isSelected = tilesStyle === tile.value;

          return (
            <button
              key={tile.value}
              className={`text-white rounded-full py-1.5 ${
                isSelected ? "bg-primary" : "bg-secondary"
              }`}
              onClick={() => changeSettingValues({ tilesStyle: tile.value })}
            >
              {tile.name}
            </button>
          );
        })}
      </div>
    </div>
  );
});
