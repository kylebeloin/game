import type { InstanceMap } from "@/utils";
import type { IComponent } from "@/systems";
import type { Entity } from "./entity";

export interface IRegisteredEntity {
  entity: Entity;
  components: InstanceMap<IComponent>;
}
