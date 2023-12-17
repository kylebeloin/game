import { Actor } from "@/actor";
import { mockGroupFactory } from "@/group";

export const mockActorFactory = (group = mockGroupFactory()): Actor =>
  new Actor(group);
