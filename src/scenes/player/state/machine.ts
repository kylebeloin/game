import { Player } from "..";
import { StateMachine } from "@/utils";
import * as States from "./states";
import { PlayerStateTypes as Types } from "./types";

export class PlayerStateMachine extends StateMachine<Player> {
  constructor(public readonly owner: Player) {
    super(owner);
    this.states = new Map([
      [Types.Idle, new States.PlayerIdleState(this)],
      [Types.Moving, new States.PlayerMovingState(this)],
      [Types.Running, new States.PlayerRunningState(this)],
    ]);
  }
}
