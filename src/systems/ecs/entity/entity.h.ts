import { IAwake, IUpdate, InstanceMap } from "@/utils";
import { IComponent } from "@/systems";

export interface IEntity extends IAwake, IUpdate {
  readonly id: number;
}

export type EntityRegistryEntry = {
  readonly id: number;
  components: InstanceMap<IComponent>;
};
