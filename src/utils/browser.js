import { randomInt } from './math'

/**
 * Checks whether HTML5 canvas are supported by the browser or not.
 */
export const isCanvasSupported = document => !!document.createElement('canvas').getContext;

/**
 * Generates a random integer between 0 and 255.
 */
const random0to255 = () => randomInt(Math.random())(0, 255);

/**
 * Generates a random CSS RGB color value string.
 * eg: rgb(123,221,25)
 */
export const randomRGB = () => `rgb(${random0to255()},${random0to255()},${random0to255()})`