import { Vector2D } from ".";

export enum Direction {
  Up = 0,
  Right,
  Down,
  Left,
}

export const DirectionVector: Record<Direction, Vector2D> = {
  [Direction.Up]: new Vector2D(0, -1),
  [Direction.Right]: new Vector2D(1, 0),
  [Direction.Down]: new Vector2D(0, 1),
  [Direction.Left]: new Vector2D(-1, 0),
};

export default Direction;
