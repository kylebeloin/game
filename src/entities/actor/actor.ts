import { Entity, Vector2D } from "@/utils";
import { Node } from "@/entities/node";
import { Group } from "@/entities/group";
import { ActorDrawComponent, ActorLocomotionComponent } from "./components";

export class Actor extends Entity {
  public get Position(): Vector2D | null {
    return this.GetComponent(ActorLocomotionComponent).Position;
  }
  constructor(public readonly Factory: Group, node: Node) {
    super();

    this.AddComponent(new ActorLocomotionComponent());
    this.GetComponent(ActorLocomotionComponent).Node = node;
  }

  public Awake(): void {
    this.AddComponent(new ActorDrawComponent());

    super.Awake();
  }
}
