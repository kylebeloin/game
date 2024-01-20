import { Entity, Vector2D } from "@/utils";
import { Node } from "@/entities/node";
import { Settings } from "@/settings";

export class Grid extends Entity {
  private _nodes: Node[] = [];

  public get Nodes(): Node[] {
    return this._nodes;
  }

  public Awake(): void {
    // awake components
    super.Awake();
    this.InitNodes();

    // awake children
    for (const node of this._nodes) {
      node.Awake();
    }
  }

  public Update(deltaTime: number): void {
    // update components
    super.Update(deltaTime);

    // update children
    for (const node of this._nodes) {
      node.Update(deltaTime);
    }
  }

  private InitNodes(): void {
    const size = Settings.grid.nodeSize;
    const offset = Settings.grid.nodeOffset;
    for (
      let index = 0;
      index < Settings.grid.dimension * Settings.grid.dimension;
      index++
    ) {
      const x = index % Settings.grid.dimension;
      const y = Math.floor(index / Settings.grid.dimension);
      const start = new Vector2D(
        x * (size + offset) + offset,
        y * (size + offset) + offset
      );
      const end = new Vector2D(start.x + size, start.y + size);
      const node = new Node(start, end, new Vector2D(x, y));
      this._nodes.push(node);
    }
  }
}
