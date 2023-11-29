import { Entity, Vector2D } from "@/utils";
import { Node } from "@/node";
import { Settings } from "@/settings"; // <--- ADD

export class Grid extends Entity {
  // --- ADD --- //
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
    for (let y = 0; y < Settings.grid.dimension; y++) {
      for (let x = 0; x < Settings.grid.dimension; x++) {
        // --- ADD --- //
        const start = new Vector2D(
          x * (size + offset) + offset,
          y * (size + offset) + offset
        );

        const end = new Vector2D(start.x + size, start.y + size);

        const index = new Vector2D(x, y);
        // --- ADD --- //

        const node = new Node(start, end, index); // <-- CHANGE
        this._nodes.push(node);
      }
    }
  }
}
