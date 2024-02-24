import { Entity } from "@/systems";
import { Grid, Group } from "@/entities";
import { Team } from "@/team";
import { GameInputComponent } from "./components";
import { Settings } from "@/settings";
import { logger } from "@/utils";

const interval = 1000 / Settings.game.fps;
let fps = 0;

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
    this._entities.push(grid, new Group(Team.Player, grid));

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

  @logger
  public frame(current: number): void {
    fps = current > Settings.game.fps - 1 ? 0 : 1 + current;
  }

  public update(): void {
    const now = window.performance.now();
    const elapsed = now - this._lastTimestamp;

    if (elapsed > interval) {
      super.update(elapsed);

      // awake all children
      for (const entity of this._entities) {
        entity.update(elapsed);
      }
      this.frame(fps);
    }

    window.requestAnimationFrame(() => {
      this._lastTimestamp = now - (elapsed % interval);

      this.update();
    });
  }
}
