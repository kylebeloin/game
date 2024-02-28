import { IAwake, IUpdate } from "@/utils";
import { logger } from "@/utils";

export class Animation implements IAwake, IUpdate {
  private _start: number = 0;
  private _playing: boolean = false;
  private _step: number = 0;

  public get playing(): boolean {
    return this._playing;
  }

  public frame: ImageBitmap | null = null;

  public constructor(
    /**
     * Total duration in frames of animation
     * Value of -1 will loop while update is called.
     * */
    public duration: number = -1,
    /** Interpolation interval */
    public interval: number,
    /** Frames to iterate over */
    private _frames: Array<ImageBitmap> = []
  ) {}

  public awake(): void {}

  public start(): void {
    this._playing = true;
    this._start = 0;
  }

  public stop(): void {
    this.frame = this._frames[0];
    this._playing = false;
  }
  /**
   *
   * @param delta Time since last update
   */
  public update(delta: number): void {
    /**
     * Is delta
     */
    if (!this._playing) return;
    const interval = this.interval;
    const elapsed = this._start + delta;
    if (elapsed > interval) {
      if (this._step >= this._frames.length) {
        this._step = 0;
      }
      this.frame = this._frames[this._step++];
      return this.start();
    }
    this._start = elapsed;
  }
}
