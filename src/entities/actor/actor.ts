import { Vector2D } from "@/utils";
import { Entity } from "@/systems";

import { Node } from "@/entities/node";
import { Group } from "@/entities/group";
import { ActorDrawComponent, ActorLocomotionComponent } from "./components";

/**
 * Actors handle collision and drawing against background layer.
 */
export class Actor extends Entity {
  public get position(): Vector2D | null {
    return this.getComponent(ActorLocomotionComponent).position;
  }

  public get locomotion(): ActorLocomotionComponent {
    return this.getComponent(ActorLocomotionComponent);
  }

  constructor(public readonly factory: Group, node: Node) {
    super();
    this.addComponent(new ActorLocomotionComponent(node));
  }

  public awake(): void {
    this.addComponent(new ActorDrawComponent());
    super.awake();
  }
}
