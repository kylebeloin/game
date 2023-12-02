import { IAwake, Vector2D, Color } from "..";

export class Canvas implements IAwake {
  private _element: HTMLCanvasElement | null = null;
  private _ctx: CanvasRenderingContext2D | null = null;

  constructor(public readonly Size: Vector2D) {}

  public get Element(): HTMLCanvasElement {
    if (!this._element) {
      throw new Error("Canvas: Element is null");
    }
    return this._element;
  }

  public get Context(): CanvasRenderingContext2D {
    if (!this._ctx) {
      throw new Error("Canvas: Context is null");
    }
    return this._ctx;
  }

  public FillRect(start: Vector2D, size: Vector2D, color: Color): void {
    if (!this._ctx) {
      throw new Error("Canvas: Context is null");
    }
    this._ctx.beginPath();
    this._ctx.fillStyle = color.AsString();
    this._ctx.rect(start.x, start.y, size.x, size.y);
    this._ctx.fill();
  }

  public ClearRect(start: Vector2D, size: Vector2D): void {
    if (!this._ctx) {
      throw new Error("Canvas: Context is null");
    }
    this._ctx.clearRect(start.x, start.y, size.x, size.y);
  }

  public FillCircle(center: Vector2D, radius: number, color: Color): void {
    if (!this._ctx) {
      throw new Error("Canvas: Context is null");
    }

    this._ctx.beginPath();
    this._ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    this._ctx.fillStyle = color.AsString();
    this._ctx.fill();
  }

  public SetStyle(style: Partial<CSSStyleDeclaration>): void {
    if (!this._element) {
      throw new Error("Canvas: Element is null");
    }
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

  public Awake(): void {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", `${this.Size.x}px`);
    canvas.setAttribute("height", `${this.Size.y}px`);

    document.body.appendChild(canvas);
    this._element = canvas;

    const ctx = this._element.getContext("2d");
    if (!ctx) {
      throw new Error("Context identifier is not supported");
    }

    this._ctx = ctx;
  }
}
