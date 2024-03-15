export class World {
  public static instance: World;
  public static get(): World {
    if (!World.instance) {
      World.instance = new World();
    }
    return World.instance;
  }
  public awake(): void {}
  public update(_: number): void {}
  public destroy(): void {}
}
