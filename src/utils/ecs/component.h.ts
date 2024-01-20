import { Entity } from "./entity/entity";
import { IAwake, IUpdate } from "@/utils";

export interface IComponent extends IAwake, IUpdate {
  Entity: Entity | null;
}
