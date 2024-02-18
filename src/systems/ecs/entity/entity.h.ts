import { IAwake, IUpdate } from "@/utils";

export interface IEntity extends IAwake, IUpdate {
  readonly id: number;
}
