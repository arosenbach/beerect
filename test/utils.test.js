import * as array from '../src/utils/array';
import * as base from '../src/utils/base';
import * as math from '../src/utils/math';
import { randomRGB } from '../src/utils/browser';

describe('Base helper functions', () => {

    test('(g ∘ f)(x) = g(f(x))', () => {
        const f = x => x + x;
        const g = x => x ** 2;
        const gof = base.compose(g)(f);
        const x = 2;

        expect(gof(x)).toEqual(g(f(x)));
    });

});

describe('Math helper functions', () => {

    test('given the same seed, randomInt is idempotent', () => {
        const seed = Math.random();
        const min = 0;
        const max = 100;
        const result1 = math.randomInt(seed)(min, max);
        const result2 = math.randomInt(seed)(min, max);
        expect(result1).toEqual(result2);
    });

    test('random values are always included in min and max limits', () => {
        const min = -10;
        const max = 10;
        const manyRandomInts = Array(100).fill().map(_ => math.randomInt(Math.random())(min, max));
        expect(manyRandomInts.every(n => n >= min && n <= max)).toBeTruthy();
    });

});

describe('Array helper functions', () => {

    describe('given an empty array', () => {
        const arr = [];
        const returnTrue = _ => true;

        test('last element is undefined', () => {
            expect(array.last(arr)).toBeUndefined();
        });

        test('lastElement is undefined whatever the predicate is', () => {
            expect(array.lastElement(returnTrue)(arr)).toBeUndefined();
        });

        test('filter returns an empty array whatever the predicate is', () => {
            expect(array.filter(returnTrue)(arr)).toEqual([]);
        });
    });

    describe('given [1,2,3,4,5]', () => {
        const arr = [1, 2, 3, 4, 5];

        const even = n => n % 2 === 0;

        test('last element is 5', () => {
            expect(array.last(arr)).toEqual(5);
        });

        test('last even element is 4', () => {
            expect(array.lastElement(even)(arr)).toEqual(4);
        });

        test('filter even number should return [2,4]', () => {
            expect(array.filter(even)(arr)).toEqual([2, 4]);
        });
    });

});

describe('Browser helper functions', () => {
    test('randomRGB return a valid CSS RGB color', () => {
        const rgbColor = randomRGB();
        expect(rgbColor).toMatch(/rgb\(\d\d*,\d\d*,\d\d*\)/);

        const rgbValues = rgbColor.match(/\d\d*,\d\d*,\d\d*/)[0].split(',');
        expect(rgbValues.every(n => n >= 0 && n <= 255)).toBeTruthy();

    });
});

