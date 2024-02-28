import { PlayerTransformComponent } from ".";
import { Settings } from "@/settings";
import { Vector2D } from "@/utils";

/**
 * This component is responsible for animating the players movement
 * and updating the player's position.
 */
export class PlayerTransformAnimateComponent extends PlayerTransformComponent {
  private _next: Vector2D | null = null;
  private _origin: Vector2D | null = null;
  private _duration: number = Settings.player.animation.transition;
  private _translating: boolean = false;
  private _elapsed: number = 0;

  public get next(): Vector2D | null {
    return this._next;
  }

  public get translating(): boolean {
    return this._translating;
  }

  /**
   * When the next position is set, the origin is set to the current position.
   * The animation will then start.
   */
  public set next(value: Vector2D | null) {
    this._origin = this.position;
    this._next = value;
    this.start();
  }

  public get position(): Vector2D {
    return super.position;
  }

  public set position(value: Vector2D) {
    if (!this._translating) {
      this.next = value;
    }
    super.position = value;
  }

  constructor(position: Vector2D = new Vector2D(0, 0)) {
    super(position);
  }

  public start(): void {
    this._translating = true;
    this._elapsed = 0;
  }

  public complete(): void {
    this.position = this._next!;
    this._next = null;
    this._origin = null;
    this._translating = false;
  }

  public update(delta: number): void {
    if (!this._next) return;
    if (this._translating) {
      this._elapsed += delta;
      const progress = this._elapsed / (this._duration * this.entity.speed);
      // If the progress is greater than or equal to 1, the next location is reached.
      if (progress >= 1) {
        return this.complete();
      } else {
        this.position = Vector2D.lerp(this._origin!, this._next, progress);
      }
    }
  }
}
