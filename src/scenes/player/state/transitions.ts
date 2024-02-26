import type { ITransition } from "@/utils";
import type { Player } from "..";
import { PlayerStateTypes } from "./types";
import { PlayerInputComponent } from "../components";

export const PlayerIdleToMove: ITransition<Player> = {
  target: PlayerStateTypes.Moving,
  check: function () {
    return this.getComponent(PlayerInputComponent).keysPressed.has("Shift");
  },
};

export const PlayerMoveToIdle: ITransition<Player> = {
  target: PlayerStateTypes.Idle,
  check: function () {
    return !this.getComponent(PlayerInputComponent).keysPressed.has("Shift");
  },
};

export const PlayerMoveToRun: ITransition<Player> = {
  target: PlayerStateTypes.Running,
  check: function () {
    return (
      this.state.current?.type === PlayerStateTypes.Moving &&
      this.getComponent(PlayerInputComponent).keysPressed.has("Shift")
    );
  },
};
