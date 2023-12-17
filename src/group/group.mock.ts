import { Group } from "@/group";
import { Team } from "@/team";

export const mockGroupFactory = (team = Team.A): Group => new Group(team);
