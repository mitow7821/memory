import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { PlayerData } from "../types";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  playersData: PlayerData[];
  formattedTime: string;
  isSinglePlayer: boolean;
  resetBoard: () => void;
}

export default function EndModal({
  playersData,
  setShowModal,
  formattedTime,
  isSinglePlayer,
  resetBoard,
}: Props) {
  return (
    <Modal heading="Koniec gry" setShowModal={setShowModal}>
      <div className="flex flex-col justify-between flex-grow gap-3">
        <div className="grid gap-3">
          {[...playersData]
            .sort((a, b) => b.score - a.score)
            .map(({ score, moves, id }) => (
              <div
                className={"grid py-1.5 px-3 rounded-md bg-white text-primary"}
                key={id}
              >
                <span className="text-lg mt-0.5 pb-1 mb-1 font-semibold border-b border-black/25">
                  Player {id}
                </span>

                {!isSinglePlayer && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Score:</span>
                    <span className="font-medium">{score}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm">Moves:</span>
                  <span className="font-medium">{moves}</span>
                </div>

                {isSinglePlayer && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time:</span>
                    <span className="font-medium">{formattedTime}</span>
                  </div>
                )}
              </div>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="bg-accent text-white rounded-full py-2 px-6 text-sm font-semibold"
            onClick={resetBoard}
          >
            Restart
          </button>

          <Link
            to="/"
            className="bg-white text-primary rounded-full py-2 px-5 text-sm font-semibold text-center"
          >
            New Game
          </Link>
        </div>
      </div>
    </Modal>
  );
}
