import { Color } from "../utils/presentation/color";

export const Settings = Object.freeze({
  game: {
    fps: 60,
  },
  debug: {
    enabled: true,
    text: {
      color: new Color(255, 255, 255, 1),
      font: "Arial",
      size: 20,
    },
  },
  grid: {
    dimension: 10,
    tileSize: 50,
    tileOffset: 0,
    color: {
      default: new Color(255, 255, 255, 1),
      active: new Color(176, 190, 197, 1),
    },
  },
  actors: {
    groupSize: 5,
    radius: 25,
    colors: {
      a: new Color(187, 222, 251, 1),
      b: new Color(255, 236, 179, 1),
    },
  },
  player: {
    animation: {
      walk: 30,
    },
  },
});
