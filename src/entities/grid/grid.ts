import { Entity } from "@/systems";
import { Vector2D } from "@/utils";
import { Node } from "@/entities";
import { Settings } from "@/settings";
import { GridOnClickComponent } from "./components";

export class Grid extends Entity {
  private _nodes: Node[] = [];

  public get nodes(): Node[] {
    return this._nodes;
  }

  public awake(): void {
    this.addComponent(new GridOnClickComponent());
    // awake components
    super.awake();
    this.initNodes();

    // awake children
    for (const node of this._nodes) {
      node.awake();
    }
  }

  public update(deltaTime: number): void {
    // update components
    super.update(deltaTime);

    // update children
    for (const node of this._nodes) {
      node.update(deltaTime);
    }
  }

  private initNodes(): void {
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
