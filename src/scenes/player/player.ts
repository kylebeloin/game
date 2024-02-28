import { Actor, Group, Tile } from "@/entities";
import {
  PlayerTransformAnimateComponent,
  PlayerInputComponent,
  PlayerAnimationComponent,
  PlayerDrawComponent,
} from "./components";
import { Direction, Stateful } from "@/utils";
import { PlayerStateMachine } from "./state";
import { Settings } from "@/settings";

export class Player extends Actor implements Stateful<Player> {
  private _direction: Direction = Direction.Down;
  private _speed: number = Settings.player.speed;

  public get direction(): Direction {
    return this._direction;
  }

  public get speed(): number {
    return this._speed;
  }

  public set speed(value: number) {
    this._speed = value;
  }

  public get input(): PlayerInputComponent {
    return this.getComponent(PlayerInputComponent);
  }

  public get transform(): PlayerTransformAnimateComponent {
    return this.getComponent(PlayerTransformAnimateComponent);
  }

  public get animation(): PlayerAnimationComponent {
    return this.getComponent(PlayerAnimationComponent);
  }

  public state!: PlayerStateMachine;

  constructor(public readonly factory: Group, tile: Tile) {
    super(factory, tile);
    this.addComponent(new PlayerTransformAnimateComponent(tile.center));
    this.addComponent(new PlayerDrawComponent());
  }

  public get position() {
    return this.transform.position;
  }

  public awake(): void {
    this.state = new PlayerStateMachine(this);
    this.addComponent(new PlayerInputComponent());
    this.addComponent(new PlayerAnimationComponent(this.state));
    super.awake();

    this.state.start();
  }

  public update(delta: number): void {
    super.update(delta);
    this.state.update(delta);
  }

  public move(direction: Direction = this._direction) {
    this._direction = direction;
    if (this.transform.translating) return;
    let next = this.locomotion.tile?.neighbors[direction];

    if (next) {
      this.transform.position = next.center;
      this.locomotion.tile = next;
    }
  }
}
