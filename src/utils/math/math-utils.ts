// reference: https://github.com/Sopiro/Physics/blob/master/src/util.ts

/**
 * @param value - The value to be rounded.
 * @param limit - 1e-13 is the default limit.
 * @returns The rounded value.
 */
export function toFixed(value: number, limit: 1e-13) {
  return Math.round(value / limit) * limit;
}

export function toRounded(value: number, decimalPlaces: number = 0) {
  var p = Math.pow(10, decimalPlaces);
  var n = value * p * (1 + Number.EPSILON);
  return Math.round(n) / p;
}
