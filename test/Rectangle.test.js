import Rectangle from '../src/Rectangle';

describe('Rectangle class', () => {

    const x = 0;
    const y = 0;
    const width = 10;
    const height = 20;
    const color = 'red';
    

    test('rotating a deactivated rectangle doesn\'t change its angle', () => {
        const rect = new Rectangle(x, y, width, height, color);
        expect(rect.rotating).toBeFalsy();
        rect.rotate();
        expect(rect.angle).toEqual(0);
    });

    test('rotating an activated rectangle changes its angle', () => {
        const rect = new Rectangle(x, y, width, height, color);
        rect.activate();
        expect(rect.rotating).toBeTruthy();
        rect.rotate();
        expect(rect.angle).not.toEqual(0);
    });

    test('when the angle is greater than 360°, the rotation is stopped with an angle of 360°', () => {
        const rect = new Rectangle(x, y, width, height, color);
        rect.activate();
        const threeSixtyDegrees = 2 * Math.PI;
        rect.rotate(threeSixtyDegrees);
        expect(rect.rotating).toBeTruthy();

        rect.rotate();
        expect(rect.angle).toEqual(threeSixtyDegrees);
        expect(rect.rotating).toBeFalsy();
    });

});