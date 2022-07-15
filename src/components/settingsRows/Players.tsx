import type { NumberOfPlayers, Settings } from "../../types";
import { playersOptions } from "../../types";
import { memo } from "react";

interface Props {
  players: NumberOfPlayers;
  changeSettingValues: (e: Partial<Settings>) => void;
}

const Players = ({ players, changeSettingValues }: Props) => (
  <div className="grid gap-2">
    <span className="text-primary/80 font-semibold">Select tiles style</span>

    <div className="grid grid-cols-4 gap-3">
      {playersOptions.map((option) => {
        const isSelected = players === option;

        return (
          <button
            key={option}
            className={`text-white rounded-full py-1.5 ${
              isSelected ? "bg-primary" : "bg-secondary"
            }`}
            onClick={() => changeSettingValues({ players: option })}
          >
            {option}
          </button>
        );
      })}
    </div>
  </div>
);

export default memo(Players, (prev, next) => prev.players === next.players);
