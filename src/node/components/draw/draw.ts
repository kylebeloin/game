import { IComponent } from "@/utils";
import { Node } from "@/node";

export class NodeDrawComponent implements IComponent {
  public Entity: Node | null = null;

  public Awake(): void {
    // to implement
  }

  public Update(deltaTime: number): void {
    // to implement
    console.log("NodeDrawComponent Update", deltaTime);
  }
}
