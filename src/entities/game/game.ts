import { Entity } from "@/utils";
import { Grid } from "@/entities/grid";
import { Team } from "@/team";
import { Group } from "@/entities/group";
import { GameInputComponent } from "./components";

export class Game extends Entity {
  private _entities: Array<Entity> = [];

  private _lastTimestamp = 0;

  public Awake(): void {
    this.AddComponent(new GameInputComponent());

    super.Awake();
    let grid = new Grid();
    this._entities.push(grid, new Group(Team.A, grid), new Group(Team.B, grid));

    for (const entity of this._entities) {
      entity.Awake();
    }

    window.requestAnimationFrame(() => {
      // set initial timestamp
      this._lastTimestamp = Date.now();

      // start update loop
      this.Update();
    });
  }

  public Update(): void {
    let deltaTime = (Date.now() - this._lastTimestamp) / 1000;
    super.Update(deltaTime);

    // awake all children
    for (const entity of this._entities) {
      entity.Update(deltaTime);
    }

    window.requestAnimationFrame(() => {
      this._lastTimestamp = Date.now();
      this.Update();
    });
  }
}
