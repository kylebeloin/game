import { Entity } from "@/utils";
import { Group } from "@/group";
import { ActorDrawComponent } from "./components";

export class Actor extends Entity {
  constructor(public readonly Factory: Group) {
    super();
  }

  public Awake(): void {
    this.AddComponent(new ActorDrawComponent());

    super.Awake();
  }
}
