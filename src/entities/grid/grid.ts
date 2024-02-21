import { Entity } from "@/systems";
import { Vector2D } from "@/utils";
import { Tile } from "@/entities";
import { Settings } from "@/settings";
import { GridOnClickComponent } from "./components";

export class Grid extends Entity {
  private _tiles: Tile[] = [];

  public get tiles(): Tile[] {
    return this._tiles;
  }

  public awake(): void {
    this.addComponent(new GridOnClickComponent());
    // awake components
    super.awake();
    this.initTiles();

    // awake children
    for (const tile of this._tiles) {
      tile.awake();
    }
  }

  public update(deltaTime: number): void {
    // update components
    super.update(deltaTime);

    // update children
    for (const tile of this._tiles) {
      tile.update(deltaTime);
    }
  }

  private initTiles(): void {
    const size = Settings.grid.tileSize;
    const offset = Settings.grid.tileOffset;
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
      const node = new Tile(start, end, new Vector2D(x, y));
      this._tiles.push(node);
    }
  }
}
