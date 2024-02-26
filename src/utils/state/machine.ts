import { IUpdate, Nullable } from "@/utils";
import { IAction } from "./state.h";
import { State } from "./state";

export abstract class StateMachine<T, U extends State<T> = State<T>>
  implements IUpdate
{
  private _states!: Map<number, U>;
  private _current: Nullable<State<T>> = null;
  private _init: number = 0;
  private _running: boolean = false;
  private _deltaTime: number = 0;

  public get states(): Map<number, U> {
    return this._states;
  }

  public set states(value) {
    this.pause();
    // Init takes the first arg in states, which is set by value.
    this._states = value;
  }

  public get current(): Nullable<State<T>> {
    return this._current;
  }

  public set current(value: Nullable<State<T>>) {
    this._current = value;
    if (this._current) this.do(this._current.enter);
  }

  public get running(): boolean {
    return this._running;
  }

  constructor(public readonly owner: T) {}

  public update(deltaTime: number): void {
    this._deltaTime = deltaTime;
    if (!this._running || !this.current) return;

    this.checkNext();
    this.do(this.current.update);
  }

  public start(): void {
    this._running = true;
    if (!this.current) this.init();
  }

  private init(): void {
    this.current = this.states.get(this._init) ?? null;
  }

  public pause(): void {
    this._running = false;
  }

  public do(actions: Array<IAction<T>>) {
    for (const action of actions) {
      action.execute.call(this.owner, this._deltaTime);
    }
  }

  public checkNext(): void {
    if (!this.current) return;

    for (const transition of this.current.transitions) {
      if (transition.check.call(this.owner)) {
        this.next(this.states.get(transition.target) ?? null);
        break;
      }
    }
  }

  public next(state: Nullable<State<T>>): void {
    if (!this.current) return;
    this.do(this.current.exit);
    this.current = state;
  }
}
