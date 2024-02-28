import { IAwake, Vector2D, Color } from "../..";
import { entrypoint } from "../../entrypoint";

export class Canvas implements IAwake {
  private _element!: HTMLCanvasElement;
  private _ctx!: CanvasRenderingContext2D;

  constructor(public readonly size: Vector2D) {}

  public get element(): HTMLCanvasElement {
    return this._element;
  }

  public get context(): CanvasRenderingContext2D {
    return this._ctx;
  }

  public fillRect(start: Vector2D, size: Vector2D, color: Color): void {
    this._ctx.beginPath();
    this._ctx.fillStyle = color.asString();
    this._ctx.rect(start.x, start.y, size.x, size.y);
    this._ctx.fill();
  }

  public drawImage(image: ImageBitmap, position: Vector2D): void {
    this._ctx.drawImage(image, position.x, position.y);
  }

  public clear() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
  }

  public clearRect(start: Vector2D, size: Vector2D): void {
    this._ctx.clearRect(start.x, start.y, size.x, size.y);
  }

  public fillCircle(center: Vector2D, radius: number, color: Color): void {
    this._ctx.beginPath();
    this._ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    this._ctx.fillStyle = color.asString();
    this._ctx.fill();
  }

  public setStyle(style: Partial<CSSStyleDeclaration>): void {
    for (const key in style) {
      if (!Object.hasOwnProperty.call(style, key)) {
        continue;
      }

      if (!style[key]) {
        continue;
      }

      this._element.style[key] = style[key] as string;
    }
  }

  public awake(): void {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", `${this.size.x}px`);
    canvas.setAttribute("height", `${this.size.y}px`);

    entrypoint.appendChild(canvas);
    this._element = canvas;

    const ctx = this._element.getContext("2d");
    if (!ctx) {
      throw new Error("Context identifier is not supported");
    }

    this._ctx = ctx;
  }

  public calcLocalPointFrom(globalPoint: Vector2D): Vector2D | null {
    const canvasRect = this._element.getBoundingClientRect();
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const offset = {
      top: canvasRect.top + scrollTop,
      left: canvasRect.left + scrollLeft,
    };

    const x = globalPoint.x - offset.left;
    const y = globalPoint.y - offset.top;

    if (x < 0 || y < 0) {
      return null;
    }

    if (
      x > offset.left + canvasRect.width ||
      y > offset.top + canvasRect.height
    ) {
      return null;
    }

    return new Vector2D(x, y);
  }

  public drawText(
    text: string,
    position: Vector2D,
    color: Color = new Color(255, 255, 255, 1),
    fontSize = 8,
    font = "Arial"
  ): void {
    this._ctx.font = `${fontSize}px ${font}`;
    this._ctx.fillStyle = color.asString();
    this._ctx.fillText(text, position.x, position.y);
  }
}
