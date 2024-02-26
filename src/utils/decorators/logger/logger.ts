import LoggerService from "./service";
import { Settings } from "@/settings";

export function logger(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  if (!Settings.debug.enabled) return;
  const originalValue = descriptor.value;
  descriptor.value = function (this, ...args: any[]) {
    // "this" here will refer to the class instance
    const message = `${this.constructor.name} ${propertyKey}: ${Array.from([
      ...args,
    ])}`;
    LoggerService.log({
      name: this.constructor.name,
      descriptor: propertyKey,
      message,
    });

    return originalValue.apply(this, args);
  };
}
