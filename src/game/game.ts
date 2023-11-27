import { Entity } from "@/utils";
import { Settings } from "@/settings";
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

    this.DirtyDraw();
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

  private DirtyDraw(): void {
    // Create and attach Canvas to the DOM
    const canvas = document.createElement("canvas");
    const canvasSize =
      (Settings.grid.nodeSize + Settings.grid.nodeOffset) *
        Settings.grid.dimension +
      Settings.grid.nodeOffset;
    // --- CHNAGE --- //
    canvas.setAttribute("width", canvasSize.toString());
    canvas.setAttribute("height", canvasSize.toString());
    document.body.appendChild(canvas);

    // draw red square
    const size = Settings.grid.nodeSize;
    const offset = Settings.grid.nodeOffset;

    for (let y = 0; y < Settings.grid.dimension; y++) {
      // <--- ADD
      for (let x = 0; x < Settings.grid.dimension; x++) {
        // <--- ADD
        const ctx = canvas.getContext("2d")!;
        ctx.beginPath();
        ctx.fillStyle = Settings.grid.color;
        ctx.rect((size + offset) * x, (size + offset) * y, size, size); // <--- CHANGE
        ctx.fill();
        // ... //
      } // <--- ADD
    }
  }
}
