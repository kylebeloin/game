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

  public keyDown(key: string): void {
    if (this.keys.has(key)) {
      this.keysPressed.add(key);
    }
  }

  public keyUp(key: string): void {
    if (this.keysPressed.has(key)) {
      this.keysPressed.delete(key);
    }
  }
}
