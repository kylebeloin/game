import { Node } from "./node";
import { Vector2D } from "@/utils";

export const mockNodeFactory = (
  start = new Vector2D(0, 0), // <--- CHANGE
  end = new Vector2D(1, 1), // <--- CHANGE
  index = new Vector2D(0, 0) // <--- CHANGE
): Node => new Node(start, end, index);
