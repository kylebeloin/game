import { IAction, IState, ITransition } from ".";
import type { StateMachine } from ".";

export class State<T> implements IState<T> {
  public readonly type!: number;
  protected _enter: Array<IAction<T>> = [];
  protected _exit: Array<IAction<T>> = [];
  protected _update: Array<IAction<T>> = [];
  protected _transitions: Array<ITransition<T>> = [];

  constructor(protected _machine: StateMachine<T>) {}

  public get enter(): IState<T>["enter"] {
    return this._enter;
  }

  public set enter(value) {
    this.bindActions(value);
    this._enter = value;
  }

  public get exit(): IState<T>["exit"] {
    return this._exit;
  }

  public set exit(value) {
    this.bindActions(value);
    this._exit = value;
  }

  public get update(): IState<T>["update"] {
    return this._update;
  }

  public set update(value) {
    this.bindActions(value);
    this._update = value;
  }

  public get transitions(): IState<T>["transitions"] {
    return this._transitions;
  }

  public set transitions(value) {
    this.bindTransitions(value);
    this._transitions = value;
  }

  private bindActions(value: IState<T>["exit" | "enter" | "update"]) {
    const len = value.length;
    for (let i = 0; i < len; i++) {
      value[i].execute.bind(this._machine.owner);
    }
  }

  private bindTransitions(value: IState<T>["transitions"]) {
    const len = value.length;
    for (let i = 0; i < len; i++) {
      value[i].check.bind(this._machine.owner);
    }
  }
}
