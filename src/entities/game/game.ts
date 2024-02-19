import { Entity } from "@/systems";
import { Grid, Group } from "@/entities";
import { Team } from "@/team";
import { GameInputComponent } from "./components";

export class Game extends Entity {
  private _entities: Array<Entity> = [];

  private _lastTimestamp = 0;

  public get entities(): Array<Entity> {
    return this._entities;
  }

  public awake(): void {
    this.addComponent(new GameInputComponent());

    super.awake();
    let grid = new Grid();
    this._entities.push(grid, new Group(Team.A, grid), new Group(Team.B, grid));

    for (const entity of this._entities) {
      entity.awake();
    }

    window.requestAnimationFrame(() => {
      // set initial timestamp
      this._lastTimestamp = window.performance.timeOrigin;

      // start update loop
      this.update();
    });
  }

  public update(): void {
    const deltaTime = (window.performance.now() - this._lastTimestamp) / 1000;
    super.update(deltaTime);

    // awake all children
    for (const entity of this._entities) {
      entity.update(deltaTime);
    }

    window.requestAnimationFrame(() => {
      this._lastTimestamp = window.performance.now();
      this.update();
    });
  }
}
