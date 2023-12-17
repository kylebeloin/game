import { IComponent } from "@/utils";
import { Ship } from "@/actor";

export class ShipLocomotionComponent implements IComponent {
  public Entity: Ship | null = null;

  public Awake(): void {
    /* @todo */
  }

  public Update(_: number): void {
    /* @todo */
  }
}
