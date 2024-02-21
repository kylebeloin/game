import { Entity } from "@/systems";
import { IOnKeyPressComponent } from "./onkeypress.h";

export abstract class OnKeyPressComponent<T extends Entity>
  implements IOnKeyPressComponent
{
  public abstract entity: T;

  public abstract awake(): void;

  public abstract update(_: number): void;

  public abstract keys: Set<string>;

  public abstract keysPressed: Set<string>;

  public keyDown(e: KeyboardEvent): void {
    if (this.keys.has(e.key)) {
      this.keysPressed.add(e.key);
    }
  }

  public keyUp(e: KeyboardEvent): void {
    if (this.keysPressed.has(e.key)) {
      this.keysPressed.delete(e.key);
    }
  }
}
