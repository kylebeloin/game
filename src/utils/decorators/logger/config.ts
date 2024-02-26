import { LogSettings, LogType } from "./logger.h";
import { Vector2D } from "@/utils";

type LogConfigEntry = Record<string, LogSettings>;

export const config: Record<string, LogConfigEntry> = {
  Player: {
    move: {
      height: 250,
      start: new Vector2D(0, 0),
      transform: (str: string) => str,
      type: LogType.Queue,
    },
    update: {
      height: 20,
      start: new Vector2D(100, 0),
      transform: (str: string) => str,
      type: LogType.Single,
    },
  },
  PlayerInputComponent: {
    keyDown: {
      height: 250,
      start: new Vector2D(210, 0),
      transform: (str: string) => str,
      type: LogType.Single,
    },
  },
  Game: {
    frame: {
      height: 20,
      start: new Vector2D(110, 0),
      transform: (str: string) => str.split(" ").at(-1) as string,
      type: LogType.Single,
    },
  },
  Default: {
    default: {
      height: 200,
      start: new Vector2D(0, 250),
      transform: (str: string) => `${str}`,
      type: LogType.Queue,
    },
  },
};
