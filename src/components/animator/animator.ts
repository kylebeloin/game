import { Entity, IComponent } from "@/systems";
import { StateMachine } from "@/utils";

export abstract class AnimatorComponent<T extends Entity>
  implements IComponent
{
  public entity!: T;
  public abstract awake(): void;
  public abstract update(deltaTime: number): void;
  public abstract state: StateMachine<T>;
}
