import { IAwake, IUpdate } from "@/utils";
import { Settings } from "@/settings";

export class Animation implements IAwake, IUpdate {
  private _start: number = 0;

  private _last: number = 0;

  public frame: IteratorResult<ImageBitmap> | null = null;

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
    this._start = 0;
  }

  public *frames(): IterableIterator<ImageBitmap> {
    if (this._frames.length)
      for (let i = 0; ; i++) {
        if (i === this._frames.length && !this.duration) {
          i = 0;
        }
        yield this._frames[i];
      }
  }

  /**
   *
   * @param delta Time since last update
   */
  public update(delta: number): void {
    /**
     * Is delta
     */
    const interval = 1000 / this.interval;
    if (delta > interval) {
      this.frame = this.frames().next();
    }
  }
}
