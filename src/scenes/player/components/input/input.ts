import { OnKeyPressComponent } from "@/components";
import type { Player } from "@/scenes";
import { Directions, Vector2D } from "@/utils";

export class PlayerInputComponent extends OnKeyPressComponent<Player> {
  public entity!: Player;

  constructor() {
    super();
  }

  public keys = new Set<string>(Object.values(Directions));

  public keysPressed = new Set<string>();

  public keyDown(e: KeyboardEvent): void {
    super.keyDown(e);
    switch (e.key) {
      case Directions.Up:
        this.entity.transform.translate(new Vector2D(0, -1));
        break;
      case Directions.Down:
        this.entity.transform.translate(new Vector2D(0, 1));
        break;
      case Directions.Left:
        this.entity.transform.translate(new Vector2D(-1, 0));
        break;
      case Directions.Right:
        this.entity.transform.translate(new Vector2D(1, 0));
        break;
      default:
        break;
    }
  }

  public keyUp(e: KeyboardEvent): void {
    super.keyUp(e);
  }

  public awake(): void {}
  public update(_: number): void {}
}
