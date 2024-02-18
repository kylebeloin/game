import { IAwake, IUpdate } from "@/utils";

export class Animation implements IAwake, IUpdate {
  private _img = new Image();

  public SpriteSheet: string;
  public CurrentFrame?: ImageBitmap;

  public constructor(spriteSheet: string) {
    this.SpriteSheet = spriteSheet;
  }

  public Awake(): void {
    this._img.src = this.SpriteSheet;
    this._img.onload = () => {
      // ...
    };
  }

  public *Frames(frames: Array<ImageBitmap>): IterableIterator<ImageBitmap> {
    for (let i = 0; ; i++) {
      if (i === frames.length) {
        i = 0;
      }
      yield frames[i];
    }
  }

  public Update(deltaTime: number): void {}
}
