import { Entity } from "../entity/entity";
import { IAwake, IRegisterable, IUpdate } from "@/utils";

export interface IComponent extends IAwake, IUpdate, IRegisterable {
  entity: Entity | null;
}
