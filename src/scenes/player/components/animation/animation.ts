import { AnimatorComponent } from "@/components";
import { Animation } from "@/utils";
import { Player } from "@/scenes";
import { getSprites } from "./cllips";
import { Direction } from "@/utils";
import { PlayerStateMachine } from "../../state";
import { Settings } from "@/settings";

export class PlayerAnimationComponent extends AnimatorComponent<Player> {
  private _clips: Map<number, Animation> = new Map();
  private _image: HTMLImageElement = new Image();
  public loaded = false;

  public get playing() {
    return this.clip?.playing;
  }

  public get clip() {
    return this._clips.get(this.entity.direction!);
  }

  public get currentFrame() {
    return this.clip?.frame;
  }

  constructor(public state: PlayerStateMachine) {
    super();
  }

  public awake(): void {
    this._image.src = "./assets/sprites/player/character.png";
    const duration = Settings.player.animation.transition;
    const interval = Settings.player.animation.walk;
    this._image.onload = () => {
      getSprites(this._image).then((sprites) => {
        this._clips.set(
          Direction.Down,
          new Animation(duration, interval, sprites[Direction.Down])
        );
        this._clips.set(
          Direction.Left,
          new Animation(duration, interval, sprites[Direction.Left])
        );
        this._clips.set(
          Direction.Up,
          new Animation(duration, interval, sprites[Direction.Up])
        );
        this._clips.set(
          Direction.Right,
          new Animation(duration, interval, sprites[Direction.Right])
        );
        this.loaded = true;
      });
    };
  }

  public start(): void {
    this.clip?.start();
  }

  public stop(): void {
    this.clip?.stop();
  }

  public update(deltaTime: number) {
    if (!this.loaded) return;
    this.clip?.update(deltaTime, this.entity.speed);
  }
}
