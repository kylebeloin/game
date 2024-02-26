import type { State } from "./state";
import type { StateMachine } from ".";

export interface IAction<T> {
  execute(this: T, deltaTime: number): void;
}

export type IActions<T> = Array<IAction<T>>;

export interface ITransition<T> {
  target: number;
  check(this: T): boolean;
}

export interface IState<T> {
  type: number;
  enter: Array<IAction<T>>;
  update: Array<IAction<T>>;
  exit: Array<IAction<T>>;
  transitions: Array<ITransition<T>>;
}

export type Stateful<T, U extends StateMachine<T> = StateMachine<T>> = T & {
  state: U;
};
