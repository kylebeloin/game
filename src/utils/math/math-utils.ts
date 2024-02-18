// reference: https://github.com/Sopiro/Physics/blob/master/src/util.ts

/**
 * @param value - The value to be rounded.
 * @param limit - 1e-13 is the default limit.
 * @returns The rounded value.
 */
export function toFixed(value: number, limit: 1e-13) {
  return Math.round(value / limit) * limit;
}
