export interface IUpdate {
  update(deltaTime: number): void;
}

export interface IAwake {
  awake(): void;
}

export interface IRegisterable {
  readonly id: string;
}
