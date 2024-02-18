import { Settings } from "@/settings";

import { Canvas, Vector2D } from "@/utils";

export class CanvasLayer {
  private static _background: Canvas | null = null;
  private static _foreground: Canvas | null = null;
  private static _main: Canvas | null = null;

  private constructor() {}

  /**
   * Canvas rendered behind all other canvases
   */
  public static get Background(): Canvas {
    if (!this._background) {
      this._background = this.InitCanvas();
    }
    return this._background;
  }

  /**
   * Canvas rendered at the player's level
   */
  public static get Main(): Canvas {
    if (!this._main) {
      this._main = this.InitCanvas({ zIndex: "1" });
    }
    return this._main;
  }

  /**
   * Canvas rendered in front of all other canvases
   */
  public static get Foreground(): Canvas {
    if (!this._foreground) {
      this._foreground = this.InitCanvas({ zIndex: "2" });
    }
    return this._foreground;
  }

  private static InitCanvas(style: Partial<CSSStyleDeclaration> = {}): Canvas {
    const size =
      (Settings.grid.nodeSize + Settings.grid.nodeOffset) *
        Settings.grid.dimension +
      Settings.grid.nodeOffset;
    const canvas = new Canvas(new Vector2D(size, size));
    canvas.Awake();
    canvas.SetStyle(style);

    return canvas;
  }
}
