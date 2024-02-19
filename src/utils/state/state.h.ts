export interface IState {
  name: string;
  onEnter(): void;
  onUpdate(): void;
  onExit(): void;
}
