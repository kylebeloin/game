import { IClickInputComponent } from "@/components";
import { IComponent } from "@/systems";

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
