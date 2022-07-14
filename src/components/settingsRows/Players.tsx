import type { NumberOfPlayers, Settings } from "../../types";
import { playersOptions } from "../../types";
import classNames from "classnames";
import { memo } from "react";

interface Props {
  players: NumberOfPlayers;
  changeSettingValues: (e: Partial<Settings>) => void;
}

const Players = ({ players, changeSettingValues }: Props) => (
  <div className="grid">
    <span>Select tiles style</span>

    {playersOptions.map((option) => {
      const isSelected = players === option;

      return (
        <button
          key={option}
          className={classNames({
            "bg-red-500": isSelected,
          })}
          onClick={() => changeSettingValues({ players: option })}
        >
          {option}
        </button>
      );
    })}
  </div>
);

export default memo(Players, (prev, next) => prev.players === next.players);
