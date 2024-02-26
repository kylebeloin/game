import { Actor, Group, Tile } from "@/entities";
import { PlayerTransformComponent, PlayerInputComponent } from "./components";
import { Direction, Stateful } from "@/utils";
import { PlayerStateMachine } from "./state";

export class Player extends Actor implements Stateful<Player> {
  public get transform(): PlayerTransformComponent {
    return this.getComponent(PlayerTransformComponent);
  }

  public state!: PlayerStateMachine;

  constructor(public readonly factory: Group, tile: Tile) {
    super(factory, tile);
    this.addComponent(new PlayerTransformComponent(tile.center));
  }

  public awake(): void {
    this.addComponent(new PlayerInputComponent());
    super.awake();

    this.state = new PlayerStateMachine(this);
    this.state.start();
  }

  public update(delta: number): void {
    super.update(delta);
    this.state.update(delta);
  }

  public move(direction: Direction) {
    const next = this.locomotion.tile?.neighbors[direction];
    if (next) {
      this.transform.translate(next.center);
      this.locomotion.tile = next;
    }
  }
}
