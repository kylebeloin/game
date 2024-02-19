import { Vector2D } from "@/utils";
import { Entity } from "@/systems";

import { Node } from "@/entities/node";
import { Group } from "@/entities/group";
import { ActorDrawComponent, ActorLocomotionComponent } from "./components";

export class Actor extends Entity {
  public get position(): Vector2D | null {
    return this.getComponent(ActorLocomotionComponent).position;
  }
  constructor(public readonly Factory: Group, node: Node) {
    super();

    this.addComponent(new ActorLocomotionComponent());
    this.getComponent(ActorLocomotionComponent).node = node;
  }

  public awake(): void {
    this.addComponent(new ActorDrawComponent());

    super.awake();
  }
}
