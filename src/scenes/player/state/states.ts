import { State } from "@/utils";
import { Player } from "..";
import { PlayerStateMachine } from ".";
import * as Actions from "./actions";
import * as Transitions from "./transitions";
import { PlayerStateTypes } from "./types";

export class PlayerIdleState extends State<Player> {
  public type: number = PlayerStateTypes.Idle;
  constructor(_machine: PlayerStateMachine) {
    super(_machine);

    this.enter = [Actions.PlayerIdleEnter];
    this.exit = [Actions.PlayerIdleExit];
    this.update = [];
    this.transitions = [Transitions.PlayerIdleToMove];
  }
}

export class PlayerMovingState extends State<Player> {
  public type: number = PlayerStateTypes.Moving;
  constructor(_machine: PlayerStateMachine) {
    super(_machine);

    this.enter = [Actions.PlayerMoveEnter];
    this.exit = [Actions.PlayerMoveExit];
    this.update = [Actions.PlayerMoveUpdate];
    this.transitions = [
      Transitions.PlayerMoveToIdle,
      Transitions.PlayerMoveToRun,
    ];
  }
}

export class PlayerRunningState extends State<Player> {
  public type: number = PlayerStateTypes.Running;
  constructor(_machine: PlayerStateMachine) {
    super(_machine);

    this.enter = [Actions.PlayerRunEnter];
    this.exit = [Actions.PlayerRunExit];
    this.update = [Actions.PlayerRunUpdate];
    this.transitions = [
      Transitions.PlayerMoveToIdle,
      Transitions.PlayerRunToMove,
    ];
  }
}
