import { Ship } from "@/actor";
import { mockFleetFactory } from "@/fleet";

export const mockShipFactory = (fleet = mockFleetFactory()): Ship =>
  new Ship(fleet);
