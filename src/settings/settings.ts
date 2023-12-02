import { Color } from "../utils/color";

const color = new Color(255, 255, 255, 1);

export const Settings = Object.freeze({
  grid: {
    dimension: 6,
    nodeSize: 100,
    nodeOffset: 10,
    color,
  },
});
