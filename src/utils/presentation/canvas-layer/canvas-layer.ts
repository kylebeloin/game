import { Settings } from "@/settings";
import { debugStyles, defaultStyles } from "./styles";

import { Canvas } from "@/utils/presentation";
import { Vector2D } from "@/utils/math";

const defaultDimensions =
  (Settings.grid.tileSize + Settings.grid.tileOffset) *
    Settings.grid.dimension +
  Settings.grid.tileOffset;

const defaultSize: Vector2D = new Vector2D(
  defaultDimensions,
  defaultDimensions
);

export class CanvasLayer {
  private static _background: Canvas | null = null;
  private static _foreground: Canvas | null = null;
  private static _main: Canvas | null = null;
  private static _debug: Canvas | null = null;

  private constructor() {}

  /**
   * Canvas rendered behind all other canvases
   */
  public static get Background(): Canvas {
    if (!this._background) {
      this._background = this.initCanvas(defaultStyles);
    }
    return this._background;
  }

  /**
   * Canvas rendered at the player's level
   */
  public static get Main(): Canvas {
    if (!this._main) {
      this._main = this.initCanvas({ zIndex: "1", ...defaultStyles });
    }
    return this._main;
  }

  /**
   * Canvas rendered in front of all other canvases
   */
  public static get Foreground(): Canvas {
    if (!this._foreground) {
      this._foreground = this.initCanvas({ zIndex: "2", ...defaultStyles });
    }
    return this._foreground;
  }

  /**
   * Surface for logging debug information.
   */
  public static get Debug(): Canvas {
    if (!this._debug) {
      const size = new Vector2D(defaultDimensions, defaultDimensions);
      this._debug = this.initCanvas(debugStyles, size);
    }
    return this._debug;
  }

  private static initCanvas(
    style: Partial<CSSStyleDeclaration> = {},
    size: Vector2D = defaultSize
  ) {
    const canvas = new Canvas(size);
    canvas.awake();
    canvas.setStyle(style);

    return canvas;
  }
}
