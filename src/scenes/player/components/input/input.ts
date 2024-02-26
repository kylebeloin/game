import { OnKeyPressComponent } from "@/components";
import type { Player } from "@/scenes";
import { DirectionalKeys, Direction, logger } from "@/utils";

export class PlayerInputComponent extends OnKeyPressComponent<Player> {
  public entity!: Player;

  constructor() {
    super();
  }

  public keys = new Set<string>([...Object.values(DirectionalKeys), "Shift"]);

  public keysPressed = new Set<string>();

  @logger
  public keyDown(key: string): void {
    super.keyDown(key);
    switch (key) {
      case DirectionalKeys.Up:
        this.entity.move(Direction.Up);
        break;
      case DirectionalKeys.Down:
        this.entity.move(Direction.Down);
        break;
      case DirectionalKeys.Left:
        this.entity.move(Direction.Left);
        break;
      case DirectionalKeys.Right:
        this.entity.move(Direction.Right);
        break;
      default:
        break;
    }
  }

  public keyUp(key: string): void {
    super.keyUp(key);
  }

  public awake(): void {}
  public update(_: number): void {}
}
