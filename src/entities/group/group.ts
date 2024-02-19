import { Entity } from "@/systems";
import { Team } from "@/team";
import { Actor, Grid } from "@/entities";
import { Settings } from "@/settings";

export class Group extends Entity {
  private readonly _actors: Actor[] = [];

  public constructor(public readonly Team: Team, private readonly _grid: Grid) {
    super();
  }

  public awake(): void {
    super.awake();

    // init and awake actors
    this.PrepareActors();
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);

    this._actors.map((actor) => actor.update(deltaTime));
  }

  private PrepareActors(): void {
    const dimension = Settings.grid.dimension; // <--- ADD
    const nodes = this._grid.nodes; // <--- ADD
    const groupSize = Settings.actors.groupSize;

    for (let i = 0; i < groupSize; i++) {
      const node =
        this.Team == Team.A
          ? nodes[i * dimension]
          : nodes[nodes.length - 1 - i * dimension];
      const actor = new Actor(this, node);
      this._actors.push(actor);
      actor.awake();
    }
  }
}
