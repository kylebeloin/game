import { IComponent } from "@/systems";

export interface IOnKeyPressComponent extends IComponent {
  keys: Set<string>;
  keysPressed: Set<string>;
  keyDown: (e: KeyboardEvent) => void;
  keyUp: (e: KeyboardEvent) => void;
}
