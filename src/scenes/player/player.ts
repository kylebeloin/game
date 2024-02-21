import { Actor, Group, Tile } from "@/entities";
import { PlayerTransformComponent, PlayerInputComponent } from "./components";
import { Vector2D } from "@/utils";

export class Player extends Actor {
  public get position(): Vector2D | null {
    return this.transform.position;
  }

  public get transform(): PlayerTransformComponent {
    return this.getComponent(PlayerTransformComponent);
  }

  constructor(public readonly factory: Group, tile: Tile) {
    super(factory, tile);
    this.addComponent(new PlayerTransformComponent(tile.center));
  }

  public awake(): void {
    this.addComponent(new PlayerInputComponent());
    super.awake();
  }

  public update(_: number): void {
    super.update(_);
  }
}
