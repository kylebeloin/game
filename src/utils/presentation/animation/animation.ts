import { IAwake, IUpdate } from "@/utils";

export class Animation implements IAwake, IUpdate {
  private _img = new Image();

  public imgSrc: string;
  public currentFrame?: ImageBitmap;

  public constructor(src: string) {
    this.imgSrc = src;
  }

  public awake(): void {
    this._img.src = this.imgSrc;
    this._img.onload = () => {
      // ...
    };
  }

  public *frames(frames: Array<ImageBitmap>): IterableIterator<ImageBitmap> {
    for (let i = 0; ; i++) {
      if (i === frames.length) {
        i = 0;
      }
      yield frames[i];
    }
  }

  public update(_: number): void {}
}
