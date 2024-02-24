import LoggerService from "./service";

export function logger(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalValue = descriptor.value;
  descriptor.value = function (this, ...args: any[]) {
    // "this" here will refer to the class instance
    const message = `${this.constructor.name} ${propertyKey}: ${Array.from([
      ...args,
    ])}`;
    const name = this.constructor.name;
    LoggerService.log({ name, descriptor: propertyKey, message });

    return originalValue.apply(this, args);
  };
}
