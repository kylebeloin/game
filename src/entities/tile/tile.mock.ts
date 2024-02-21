import { Tile } from "./tile";
import { Vector2D } from "@/utils";

export const mockTileFactory = (
  start = new Vector2D(0, 0),
  end = new Vector2D(1, 1),
  location = new Vector2D(0, 0)
): Tile => new Tile(start, end, location);
