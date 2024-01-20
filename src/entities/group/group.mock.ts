import { mockGridFactory } from "@/entities";
import { Group } from "@/entities";
import { Team } from "@/team";

export const mockGroupFactory = (
  team = Team.A,
  grid = mockGridFactory()
): Group => new Group(team, grid);
