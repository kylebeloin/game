import { Actor, Node } from "@/entities";
import { LocomotionComponent } from "@/components";
import { Vector2D } from "@/utils";

export class ActorLocomotionComponent extends LocomotionComponent<Actor> {
  public entity!: Actor;

  /**
   * It is possible for an actor to stand nowhere; in this case, it is null.
   */
  private _node: Node | null = null;

  public get node(): Node | null {
    return this._node;
  }

  public set node(value: Node | null) {
    this._node = value;
  }

  public get position(): Vector2D | null {
    return this.node ? this.node.center : null;
  }

  public awake(): void {
    /* @todo */
  }

  public update(_: number): void {
    /* @todo */
  }
}
