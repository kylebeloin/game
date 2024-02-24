import { Settings } from "@/settings";
export const debugStyles: Partial<CSSStyleDeclaration> = {
  position: "absolute",
  backgroundColor: "black",
  translate: "unset",
  left: `${
    20 +
    (Settings.grid.tileSize + Settings.grid.tileOffset) *
      Settings.grid.dimension +
    Settings.grid.tileOffset
  }px`,
};
