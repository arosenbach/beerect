import { compose } from './base'

/**
 * Returns the last element of an array.
 * last :: [a] -> a
 */
export const last = arr => arr[arr.length - 1];

/**
 * Filters an array returning the array of the elements that satisfy a predicate.
 * filter :: (a -> Bool) -> [a] -> [a] 
 */
export const filter = predicate => arr => Array.prototype.filter.call(arr, predicate);

/**
 * Returns the last element of an array that satisfies a predicate.
 * lastElement :: Predicate -> [a] -> a
 */
export const lastElement = predicate => compose(last)(filter(predicate));


