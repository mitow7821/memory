import type { Settings, SizeOfTheBoard } from "../../types";
import { boardSizeOptions } from "../../types";

import classNames from "classnames";
import { memo } from "react";

interface Props {
  boardSize: SizeOfTheBoard;
  changeSettingValues: (e: Partial<Settings>) => void;
}

const BoardSize = ({ boardSize, changeSettingValues }: Props) => (
  <div className="grid gap-2">
    <span className="text-primary/80 font-semibold">Select tiles style</span>

    <div className="grid grid-cols-3 gap-3">
      {boardSizeOptions.map((option) => {
        const isSelected = option === boardSize;

        return (
          <button
            key={option}
            className={`text-white rounded-full py-1.5 ${
              isSelected ? "bg-primary" : "bg-secondary"
            }`}
            onClick={() => changeSettingValues({ boardSize: option })}
          >
            {option}
          </button>
        );
      })}
    </div>
  </div>
);

export default memo(
  BoardSize,
  (prev, next) => prev.boardSize === next.boardSize
);
