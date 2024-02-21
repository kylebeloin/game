export const lerp = (start: number, end: number, t: number): number => {
  if (t < 0 || t > 1) {
    throw new Error(
      "Lerp can only be called between with increments between 0 and 1."
    );
  }
  return start * (1 - t) + end * t;
};
