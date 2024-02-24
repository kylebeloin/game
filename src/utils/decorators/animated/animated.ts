import { Animation } from "@/utils";

interface IAnimatedArgs {
  animation: Animation;
  animator: (args: any) => void;
}

/**
 * Decorator takes an Animation class, and
 */
export function animated() {}
