import { Tile } from "../types";

export const compareTiles = (firstTile: Tile | null, secondTile: Tile | null) =>
  firstTile?.value === secondTile?.value &&
  firstTile?.xIndex === secondTile?.xIndex &&
  firstTile?.yIndex === secondTile?.yIndex;
