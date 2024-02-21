import { Actor, mockGroupFactory, mockTileFactory } from "@/entities";

export const mockActorFactory = (
  group = mockGroupFactory(),
  node = mockTileFactory()
): Actor => new Actor(group, node);
