import { Link } from "react-router-dom";

interface Props {
  formattedTime: string;
  isSinglePlayer: boolean;
  resetBoard: () => void;
}

export default function BoardHeader({
  formattedTime,
  isSinglePlayer,
  resetBoard,
}: Props) {
  return (
    <div
      className={`grid items-center ${
        !isSinglePlayer ? "grid-cols-3" : "grid-cols-2"
      }`}
    >
      <h1 className="text-primary text-[1.7rem] font-semibold">memory</h1>

      {!isSinglePlayer && (
        <h2 className="font-semibold text-lg text-primary justify-self-center">
          Time: {formattedTime}
        </h2>
      )}

      <div className="flex gap-3 items-center justify-self-end">
        <button
          className="bg-accent text-white rounded-full py-2 px-6 text-sm font-semibold"
          onClick={resetBoard}
        >
          Restart
        </button>

        <Link
          to="/"
          className="bg-gray text-primary rounded-full py-2 px-5 text-sm font-semibold"
        >
          New Game
        </Link>
      </div>
    </div>
  );
}
