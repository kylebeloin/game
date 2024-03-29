import { IAction } from "@/utils";
import { Player } from "..";
import { Settings } from "@/settings";

export const PlayerMoveEnter: IAction<Player> = {
  execute: function (_) {
    this.animation.start();
  },
};

export const PlayerMoveExit: IAction<Player> = {
  execute: function (_) {},
};

export const PlayerMoveUpdate: IAction<Player> = {
  execute: function (_) {
    if (!this.animation.playing) this.animation.start();
    this.move();
  },
};

export const PlayerIdleEnter: IAction<Player> = {
  execute: function (_) {
    this.animation.stop();
  },
};

export const PlayerIdleExit: IAction<Player> = {
  execute: function (_) {
    console.log("Player idle exit:", this.components);
  },
};

export const PlayerIdleUpdate: IAction<Player> = {
  execute: function (_) {
    console.log("Player idle update:", this.components);
  },
};
// Running state actions
export const PlayerRunEnter: IAction<Player> = {
  execute: function (_) {
    this.speed = 0.75;
    this.animation.start();
  },
};

export const PlayerRunExit: IAction<Player> = {
  execute: function (_) {
    this.speed = Settings.player.speed;
  },
};

export const PlayerRunUpdate: IAction<Player> = {
  execute: function (_) {
    if (!this.animation.playing) this.animation.start();
    this.move();
  },
};
