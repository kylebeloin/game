import { Entity, Component } from "@/systems";
import { IOnKeyPressComponent } from "./onkeypress.h";

export abstract class OnKeyPressComponent<T extends Entity>
  extends Component<T>
  implements IOnKeyPressComponent
{
  public abstract keys: Set<string>;

  public abstract pressed: Set<string>;

  public keyDown(key: string): void {
    if (this.keys.has(key)) {
      this.pressed.add(key);
    }
  }

  public keyUp(key: string): void {
    if (this.pressed.has(key)) {
      this.pressed.delete(key);
    }
  }
}
