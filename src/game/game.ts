import { Entity } from "@/utils";
import { Grid } from "@/grid";
import { Team } from "@/team";
import { Fleet } from "@/fleet";

export class Game extends Entity {
  private _entities: Array<Entity> = [];

  private _lastTimestamp = 0;

  public Awake(): void {
    super.Awake();

    this._entities.push(new Grid(), new Fleet(Team.A), new Fleet(Team.B));

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
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000;
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
