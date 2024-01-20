import { Actor, mockGroupFactory, mockNodeFactory } from "@/entities";

export const mockActorFactory = (
  group = mockGroupFactory(),
  node = mockNodeFactory()
): Actor => new Actor(group, node);
