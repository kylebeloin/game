import { IClickInputComponent } from "@/components";
import { IComponent } from "@/utils";

export const isClickInput = (
  component: IComponent
): component is IClickInputComponent => {
  return component.hasOwnProperty("HandleClick");
};

export const isKeyInput = (
  component: IComponent
): component is IClickInputComponent => {
  return component.hasOwnProperty("HandleKey");
};
