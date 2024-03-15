import { Entity, Component } from "@/systems";
import { StateMachine } from "@/utils";

export abstract class AnimatorComponent<T extends Entity> extends Component<T> {
  public abstract state: StateMachine<T>;
}
