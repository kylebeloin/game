import { CanvasLayer, Vector2D, Color } from "@/utils";
import { LoggerArgs, LogMessageMap, LogType, LogHandlerArgs } from "..";
import { config } from "./config";

class LoggerService {
  private size: number = 12;
  private handleEntry(args: LogHandlerArgs) {
    const { settings, message } = args;
    const m = this.messages!.get(args.name)!.get(args.descriptor) as string;
    this.messages!.get(args.name)!.set(
      args.descriptor,
      settings.transform(message)
    );
    CanvasLayer.Debug.clearRect(
      settings.start,
      new Vector2D(
        Math.max(
          CanvasLayer.Debug.context.measureText(message).width,
          CanvasLayer.Debug.context.measureText(m).width
        ),
        settings.height
      )
    );
    CanvasLayer.Debug.drawText(
      settings.transform(message),
      new Vector2D(settings.start.x, settings.start.y + this.size),
      new Color(255, 255, 255, 1),
      this.size,
      "Courier"
    );
  }

  private handleList(args: LogHandlerArgs) {
    const { settings, message } = args;
    const messages = this.messages!.get(args.name)!.get(
      args.descriptor
    ) as Array<string>;
    messages.push(settings.transform(message));
    if (messages.length * this.size > settings.height) messages.shift();
    CanvasLayer.Debug.clearRect(
      settings.start,
      new Vector2D(
        CanvasLayer.Debug.context.measureText(message).width,
        settings.height
      )
    );

    messages.forEach((m, i) =>
      CanvasLayer.Debug.drawText(
        m,
        new Vector2D(
          settings.start.x,
          i * this.size + settings.start.y + this.size
        ),
        new Color(255, 255, 255, 1),
        this.size,
        "Courier"
      )
    );
    this.messages!.get(args.name)!.set(args.descriptor, messages);
  }

  private messages: LogMessageMap = new Map();

  public log(args: LoggerArgs) {
    const { name, descriptor, message } = args;
    const settings = config?.[name]?.[descriptor] ?? config.Default.default;
    const handlerArgs = { name, descriptor, settings, message };
    if (!this.messages.has(name)) {
      this.messages.set(
        name,
        new Map([[descriptor, settings.type === LogType.Queue ? [] : ""]])
      );
      return settings.type === LogType.Queue
        ? this.handleList(handlerArgs)
        : this.handleEntry(handlerArgs);
    }
    if (!this.messages.get(name)?.has(descriptor)) {
      this.messages
        .get(name)
        ?.set(descriptor, settings.type === LogType.Queue ? [] : "");
    }
    return settings.type === LogType.Queue
      ? this.handleList(handlerArgs)
      : this.handleEntry(handlerArgs);
  }
}

export default new LoggerService();
