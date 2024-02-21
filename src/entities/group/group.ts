import { Entity } from "@/systems";
import { Team } from "@/team";
import { Actor, Grid } from "@/entities";
import { Player } from "@/scenes";
import { Settings } from "@/settings";

export class Group extends Entity {
  private readonly _actors: Actor[] = [];

  public constructor(public readonly team: Team, private readonly _grid: Grid) {
    super();
  }

  public awake(): void {
    super.awake();

    // init and awake actors
    this.prepareActors();
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);

    this._actors.map((actor) => actor.update(deltaTime));
  }

  private prepareActors(): void {
    if (this.team !== Team.Player) {
      const dimension = Settings.grid.dimension;
      const nodes = this._grid.nodes;
      const groupSize = Settings.actors.groupSize;

      for (let i = 0; i < groupSize; i++) {
        const node =
          this.team == Team.A
            ? nodes[i * dimension]
            : nodes[nodes.length - 1 - i * dimension];
        const actor = new Actor(this, node);
        this._actors.push(actor);
        actor.awake();
      }
    } else {
      this.preparePlayers();
    }
  }

  private preparePlayers(): void {
    // to implement
    const middleNode =
      this._grid.nodes[Math.floor(this._grid.nodes.length / 2)];
    const player = new Player(this, middleNode);
    this._actors.push(player);
    player.awake();
  }
}
