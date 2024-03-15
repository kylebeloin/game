import { OnKeyPressComponent } from "@/components";
import type { Player } from "@/scenes";
import { DirectionalKeys, Direction, logger } from "@/utils";

export class PlayerInputComponent extends OnKeyPressComponent<Player> {
  constructor() {
    super();
  }

  public keys = new Set<string>([...Object.values(DirectionalKeys), "Shift"]);

  public pressed = new Set<string>();

  @logger
  public keyDown(key: string): void {
    if (this.pressed.has(key)) return;
    super.keyDown(key);
    switch (key) {
      case DirectionalKeys[Direction.Up]:
        this.entity.move(Direction.Up);
        break;
      case DirectionalKeys[Direction.Down]:
        this.entity.move(Direction.Down);
        break;
      case DirectionalKeys[Direction.Left]:
        this.entity.move(Direction.Left);
        break;
      case DirectionalKeys[Direction.Right]:
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
