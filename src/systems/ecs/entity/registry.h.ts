import type { InstanceMap } from "@/utils";
import type { IComponent } from "@/systems";

export interface IRegisteredEntity {
  id: number;
  components: InstanceMap<IComponent>;
}
