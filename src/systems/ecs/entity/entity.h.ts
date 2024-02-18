import { IAwake, IUpdate, IComponent } from "@/utils";
import { InstanceMap } from "@/utils";

export interface IEntity extends IAwake, IUpdate {
  readonly id: number;
}

export type EntityRegistryEntry = {
  readonly id: number;
  components: InstanceMap<IComponent>;
};
