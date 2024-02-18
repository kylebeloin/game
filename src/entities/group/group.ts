import { Entity } from "@/systems";
import { Team } from "@/team";
import { Actor, Grid } from "@/entities";
import { Settings } from "@/settings";

export class Group extends Entity {
  private readonly _actors: Actor[] = [];

  public constructor(public readonly Team: Team, private readonly _grid: Grid) {
    super();
  }

  public Awake(): void {
    super.Awake();

    // init and awake actors
    this.PrepareActors();
  }

  public Update(deltaTime: number): void {
    super.Update(deltaTime);

    this._actors.map((actor) => actor.Update(deltaTime));
  }

  private PrepareActors(): void {
    const dimension = Settings.grid.dimension; // <--- ADD
    const nodes = this._grid.Nodes; // <--- ADD
    const groupSize = Settings.actors.groupSize;

    for (let i = 0; i < groupSize; i++) {
      const node =
        this.Team == Team.A
          ? nodes[i * dimension]
          : nodes[nodes.length - 1 - i * dimension];
      const actor = new Actor(this, node);
      this._actors.push(actor);
      actor.Awake();
    }
  }
}
