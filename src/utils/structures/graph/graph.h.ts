import { Vector2D } from "@/utils";

export interface IGraphNode {
  position: Vector2D;
}

export interface IGraph {
  neighbors(node: IGraphNode): Array<IGraphNode>;
}
