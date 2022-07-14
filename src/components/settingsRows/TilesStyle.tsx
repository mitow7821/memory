import type { Settings, TileStyle } from "../../types";
import classNames from "classnames";
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
    <div className="grid">
      <span>Select tiles style</span>

      {tiles.map((tile) => {
        const isSelected = tilesStyle === tile.value;

        return (
          <button
            key={tile.value}
            className={classNames({
              "bg-red-500": isSelected,
            })}
            onClick={() => changeSettingValues({ tilesStyle: tile.value })}
          >
            {tile.name}
          </button>
        );
      })}
    </div>
  );
});
