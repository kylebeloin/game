import { Actor, Group, Tile } from "@/entities";
import { PlayerTransformComponent, PlayerInputComponent } from "./components";
import { Direction, logger } from "@/utils";

export class Player extends Actor {
  public get transform(): PlayerTransformComponent {
    return this.getComponent(PlayerTransformComponent);
  }

  constructor(public readonly factory: Group, tile: Tile) {
    super(factory, tile);
    this.addComponent(new PlayerTransformComponent(tile.center));
  }

  @logger
  public awake(): void {
    this.addComponent(new PlayerInputComponent());
    super.awake();
  }

  public update(delta: number): void {
    super.update(delta);
  }

  @logger
  public move(direction: Direction) {
    const next = this.locomotion.tile?.neighbors[direction];
    if (next) {
      this.transform.translate(next.center);
      this.locomotion.tile = next;
    }
  }
}
