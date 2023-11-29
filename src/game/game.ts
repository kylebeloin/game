import { Entity } from "@/utils";
import { Grid } from "@/grid"; // <--- ADD

export class Game extends Entity {
  public Entities: Array<Entity> = [];

  private _lastTimestamp = 0;

  public Awake(): void {
    super.Awake();

    this.Entities.push(new Grid());

    for (const entity of this.Entities) {
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
    for (const entity of this.Entities) {
      entity.Update(deltaTime);
    }

    window.requestAnimationFrame(() => {
      this._lastTimestamp = Date.now();
      this.Update();
    });
  }
}
