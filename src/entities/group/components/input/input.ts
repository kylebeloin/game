import {
  InputComponent,
  IKeyInputComponent,
  OnKeyPressComponent,
} from "@/components";
import { Group } from "@/entities";
import { Player } from "@/scenes";

export class GroupInputComponent
  extends InputComponent<Group>
  implements IKeyInputComponent
{
  public entity!: Group;

  public awake(): void {
    document.body.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.body.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  public handleKeyDown(e: KeyboardEvent): void {
    for (const entity of this.entity.actors) {
      if (!entity.hasComponent(OnKeyPressComponent<Player>)) continue;

      entity.getComponent(OnKeyPressComponent<Player>).keyDown(e);
    }
  }

  public handleKeyUp(e: KeyboardEvent): void {
    for (const entity of this.entity.actors) {
      if (!entity.hasComponent(OnKeyPressComponent)) continue;
      entity.getComponent(OnKeyPressComponent).keyUp(e);
    }
  }
}
