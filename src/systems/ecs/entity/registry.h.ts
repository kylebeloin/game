import type { InstanceMap, IComponent } from "@/utils";

export interface IRegisteredEntity {
  id: number;
  components: InstanceMap<IComponent>;
}
