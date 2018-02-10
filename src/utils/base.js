/**
 * Composes two unary functions (f ○ g)
 * compose :: (b -> c) -> (a -> b) -> (a -> c)
 */
export const compose = f => g => x => f(g(x));
