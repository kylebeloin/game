import { Actor, Node } from "@/entities";
import { LocomotionComponent } from "@/components";
import { Vector2D } from "@/utils";

export class ActorLocomotionComponent extends LocomotionComponent<Actor> {
  constructor(node: Node) {
    super();
    this._node = node;
  }

  public entity!: Actor;
  /**
   * It is possible for an actor to stand nowhere; in this case, it is null.
   */
  protected _node: Node | null = null;

  public get node(): Node | null {
    return this._node;
  }

  public set node(value: Node) {
    this._node = value;
    this._node.actor = this.entity;
  }

  public get position(): Vector2D | null {
    return this.node ? this.node.center : null;
  }

  public awake(): void {
    if (this._node) this._node.actor = this.entity;
  }

  public update(_: number): void {
    /* @todo */
  }
}
