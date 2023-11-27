import { Entity } from "@/utils";
import { NodeDrawComponent } from "./components/draw/draw";

export class Node extends Entity {
  public Awake(): void {
    this.AddComponent(new NodeDrawComponent());

    super.Awake();
  }
}
