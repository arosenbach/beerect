/**
 * Generates a random number within a closed interval (both limits are included).
 * randomInt :: Float -> (Int, Int) -> Int
 * @param {number} seed - A positive float less than 1. (eg: Math.random())
 * @param {number} min - A positive or negative integer representing the lower bound of the interval
 * @param {number} max - A positive or negative integer representing the upper bound of the interval
 */
export const randomInt = seed => (min, max) => Math.floor(seed * (max - min + 1) + min);
