import { IComponent, Vector2D } from "@/utils";
import { Actor } from "@/entities/actor";
import { Node } from "@/entities/node";

export class ActorLocomotionComponent implements IComponent {
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
