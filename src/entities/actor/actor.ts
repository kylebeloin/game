import { Vector2D } from "@/utils";
import { Entity } from "@/systems";

import { Tile } from "@/entities/tile";
import { Group } from "@/entities/group";
import { ActorLocomotionComponent } from "./components";

/**
 * Actors handle collision and drawing against background layer.
 */
export class Actor extends Entity {
  public get position(): Vector2D | null {
    return this.getComponent(ActorLocomotionComponent).position;
  }

  public get lastPosition(): Vector2D | null {
    return this.getComponent(ActorLocomotionComponent).lastPosition;
  }

  public get locomotion(): ActorLocomotionComponent {
    return this.getComponent(ActorLocomotionComponent);
  }

  constructor(public readonly factory: Group, node: Tile) {
    super();
    this.addComponent(new ActorLocomotionComponent(node));
  }

  public awake(): void {
    super.awake();
  }
}
