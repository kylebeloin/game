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
      const tile = new Tile(start, end, new Vector2D(x, y));
      const top =
        tile.location.y > 0
          ? this._tiles.at(tile.index - Settings.grid.dimension)
          : null;
      const left = tile.location.x > 0 ? this._tiles.at(tile.index - 1) : null;
      // 0: top, 1: right, 2: bottom, 3: left,
      if (top) {
        // Bottom
        tile.neighbors[0] = top;
        top.neighbors[2] = tile;
      }
      if (left) {
        tile.neighbors[3] = left;
        left.neighbors[1] = tile;
      }
      this._tiles.push(tile);
    }
  }
}
