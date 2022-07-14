import type { Settings, SizeOfTheBoard } from "../../types";
import { boardSizeOptions } from "../../types";

import classNames from "classnames";
import { memo } from "react";

interface Props {
  boardSize: SizeOfTheBoard;
  changeSettingValues: (e: Partial<Settings>) => void;
}

const BoardSize = ({ boardSize, changeSettingValues }: Props) => (
  <div className="grid">
    <span>Select tiles style</span>

    {boardSizeOptions.map((option) => {
      const isSelected = option === boardSize;

      return (
        <button
          key={option}
          className={classNames({
            "bg-red-500": isSelected,
          })}
          onClick={() => changeSettingValues({ boardSize: option })}
        >
          {option}
        </button>
      );
    })}
  </div>
);

export default memo(
  BoardSize,
  (prev, next) => prev.boardSize === next.boardSize
);
