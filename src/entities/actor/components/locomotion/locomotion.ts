import { Actor, Node } from "@/entities";
import { LocomotionComponent } from "@/components";
import { Vector2D } from "@/utils";

export class ActorLocomotionComponent extends LocomotionComponent<Actor> {
  public Entity!: Actor;

  /**
   * It is possible for an actor to stand nowhere; in this case, it is null.
   */
  private _node: Node | null = null;

  public get Node(): Node | null {
    return this._node;
  }

  public set Node(value: Node | null) {
    this._node = value;
  }

  public get Position(): Vector2D | null {
    return this.Node ? this.Node.Center : null;
  }

  public Awake(): void {
    /* @todo */
  }

  public Update(_: number): void {
    /* @todo */
  }
}
