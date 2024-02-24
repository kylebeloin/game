import { Entity } from "@/systems";
import { Team } from "@/team";
import { Actor, Grid } from "@/entities";
import { Player } from "@/scenes";
import { Settings } from "@/settings";
import { GroupInputComponent } from "./components";
import { Vector2D } from "@/utils";

export class Group extends Entity {
  private readonly _actors: Actor[] = [];

  public get actors() {
    return this._actors;
  }

  public constructor(public readonly team: Team, private readonly _grid: Grid) {
    super();
    this.addComponent(new GroupInputComponent());
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
      const nodes = this._grid.tiles;
      const groupSize = Settings.actors.groupSize;

      for (let i = 0; i < groupSize; i++) {
        const tile =
          this.team == Team.A
            ? nodes[i * dimension]
            : nodes[nodes.length - 1 - i * dimension];
        const actor = new Actor(this, tile);
        this._actors.push(actor);
        actor.awake();
      }
    } else {
      this.preparePlayers();
    }
  }

  private preparePlayers(): void {
    // to implement
    const loc = Vector2D.lerp(
      this._grid.tiles[0].location,
      this._grid.tiles[this._grid.tiles.length - 1].location,
      0.5
    );
    const i = Math.ceil(loc.y) * Settings.grid.dimension + Math.ceil(loc.x);

    const middleNode = this._grid.tiles[i];
    const player = new Player(this, middleNode);
    this._actors.push(player);
    player.awake();
  }
}
