import { IComponent } from "@/utils";

export interface IInputComponent extends IComponent {}

export interface IClickInputComponent extends IInputComponent {
  HandleClick(e: MouseEvent): void;
}

export interface IKeyInputComponent extends IInputComponent {
  HandleKeyDown(e: KeyboardEvent): void;
  HandleKeyUp(e: KeyboardEvent): void;
}

// Wraps up all input types.
export type InputComponents<T extends IInputComponent> = T & IInputComponent;
