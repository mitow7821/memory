import { PlayerData } from "../types";

interface Props {
  formattedTime: string;
  isSinglePlayer: boolean;
  playersData: PlayerData[];
  currentPlayerId: number;
}

function SinglePlayerFooter({
  currentPlayerData,
  formattedTime,
}: {
  currentPlayerData: PlayerData | undefined;
  formattedTime: string;
}) {
  return (
    <>
      <div className="flex gap-3 whitespace-nowrap items-center justify-between py-2 px-4 rounded-md bg-accent text-white w-1/4">
        <span className="text-sm mt-0.5 font-medium">Time</span>

        <h2 className="font-semibold text-xl">{formattedTime}</h2>
      </div>

      <div className="flex gap-3 whitespace-nowrap items-center justify-between py-2 px-4 rounded-md bg-secondary text-dark w-1/4">
        <span className="text-sm mt-0.5 font-medium">Moves</span>

        <h2 className="font-semibold text-xl">
          {currentPlayerData?.moves ?? 0}
        </h2>
      </div>
    </>
  );
}

function MultiPlayerFooter({
  playersData,
  currentPlayerId,
}: {
  playersData: PlayerData[];
  currentPlayerId: number;
}) {
  return (
    <>
      {playersData.map(({ score, id }) => (
        <div className="w-1/4 flex flex-col gap-2 -mb-2">
          <div
            className={`relative flex gap-3 whitespace-nowrap items-center justify-between py-2 px-4 rounded-md  ${
              id === currentPlayerId
                ? "bg-accent text-white after:bg-accent after:w-5 after:h-5 after:-top-2 after:rotate-45 after:left-1/2 after:-translate-x-1/2 after:absolute"
                : "bg-secondary text-dark"
            }`}
            key={id}
          >
            <span className="text-sm mt-0.5 font-medium">Player {id}</span>

            <h2 className="font-semibold text-xl">{score}</h2>
          </div>

          {id === currentPlayerId && (
            <span className="text-xs font-semibold text-primary/80 mx-auto -tracking-tighter">
              CURRENT TURN
            </span>
          )}
        </div>
      ))}
    </>
  );
}

export default function BoardFooter({
  formattedTime,
  isSinglePlayer,
  playersData,
  currentPlayerId,
}: Props) {
  const currentPlayerData = playersData.find(
    ({ id }) => id === currentPlayerId
  );

  return (
    <div className="flex gap-5 justify-center">
      {isSinglePlayer ? (
        <SinglePlayerFooter
          currentPlayerData={currentPlayerData}
          formattedTime={formattedTime}
        />
      ) : (
        <MultiPlayerFooter
          currentPlayerId={currentPlayerId}
          playersData={playersData}
        />
      )}
    </div>
  );
}
