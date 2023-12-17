import { Entity } from "@/utils";
import { Team } from "@/team";
import { Actor } from "@/actor";
import { Settings } from "@/settings";

export class Group extends Entity {
  private readonly _actors: Actor[] = [];

  public constructor(public readonly Team: Team) {
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
    const groupSize = Settings.actors.groupSize;

    for (let i = 0; i < groupSize; i++) {
      const actor = new Actor(this);
      this._actors.push(actor);
      actor.Awake();
    }
  }
}
