import { IComponent } from "@/systems";

export interface IInputComponent extends IComponent {}

export interface IClickInputComponent extends IInputComponent {
  handleClick(e: MouseEvent): void;
}

export interface IKeyInputComponent extends IInputComponent {
  handleKeyDown(e: KeyboardEvent): void;
  handleKeyUp(e: KeyboardEvent): void;
}

// Wraps up all input types.
export type InputComponents<T extends IInputComponent> = T & IInputComponent;
