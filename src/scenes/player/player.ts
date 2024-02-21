import { Actor, Group, Node } from "@/entities";
import { PlayerTransformComponent, PlayerInputComponent } from "./components";
import { Vector2D } from "@/utils";

export class Player extends Actor {
  public get position(): Vector2D | null {
    return this.transform.position;
  }

  public get transform(): PlayerTransformComponent {
    return this.getComponent(PlayerTransformComponent);
  }

  constructor(public readonly factory: Group, node: Node) {
    super(factory, node);
    this.addComponent(new PlayerTransformComponent());
  }
  public awake(): void {
    this.addComponent(new PlayerInputComponent());
    super.awake();
  }
  public update(_: number): void {
    super.update(_);
  }
}
