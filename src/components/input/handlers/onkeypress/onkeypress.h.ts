import { IComponent } from "@/systems";

export interface IOnKeyPressComponent extends IComponent {
  keys: Set<string>;
  pressed: Set<string>;
  keyDown: (key: string) => void;
  keyUp: (key: string) => void;
}
