import { Vector2D } from "@/utils";

export enum LogType {
  Queue = 0,
  Single,
}

export type LogSettings = {
  start: Vector2D;
  height: number;
  transform: (...args: any) => string;
  type: LogType;
};

export type LogHandlerArgs = {
  settings: LogSettings;
  message: string;
  name: string;
  descriptor: string;
};

export type LoggerArgs = {
  name: string;
  descriptor: string;
  message: string;
};

export type LogMessageMap = Map<string, Map<string, string | Array<string>>>;
