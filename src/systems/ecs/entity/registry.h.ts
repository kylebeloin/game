import type { InstanceMap } from "@/utils";
import type { IComponent } from "@/systems";

export type RegisteredEntity = {
  id: number;
  components: InstanceMap<IComponent>;
};
