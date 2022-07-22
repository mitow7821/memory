type TileStyle = "numbers" | "icons";

const playersOptions = [1, 2, 3, 4] as const;
type NumberOfPlayers = typeof playersOptions[number];

const boardSizeOptions = [4, 6] as const;
type SizeOfTheBoard = typeof boardSizeOptions[number];

interface Settings {
  tilesStyle: TileStyle;
  players: NumberOfPlayers;
  boardSize: SizeOfTheBoard;
}

export { playersOptions, boardSizeOptions };
export type { TileStyle, NumberOfPlayers, SizeOfTheBoard, Settings };

export interface Tile {
  value: number;
  yIndex: number;
  xIndex: number;
}

export interface PlayerData {
  id: number;
  score: number;
  moves: number;
}
