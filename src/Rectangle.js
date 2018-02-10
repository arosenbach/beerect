/**
 * 360° angle in radian.
 * @constant {number}
 */
const FULL_ROTATION = 2 * Math.PI;

/**
 * The default rotation step is angle in radian calculated so that
 * a full rotation takes 2 seconds with a frame rate of 60 fps.
 * @constant {number}
 * @default
 */
const DEFAULT_ROTATION_STEP = FULL_ROTATION / 120; // full rotation takes 2sec with a frame rate of 60fps.



/**
 * Class representing a rectangle.
 * A rectangle may be activated. Once activated it is possible to rotate it.
 */
class Rectangle {

    /**
     * Creates a Rectangle, with a default orientation angle to 0°.
     * @param {number} x - The x-coordinate of the upper-left corner of the rectangle
     * @param {number} y - The y-coordinate of the upper-left corner of the rectangle
     * @param {number} width - The width of the rectangle, in pixels
     * @param {number} height - The height of the rectangle, in pixels
     * @param {string} color - A CSS color value that indicates the fill color of the rectangle.
     */
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.angle = 0;
        this.rotating = false;
    }

    /**
     * The x-coordinate of the left side of the rectangle.
     * @type {number}
     */
    get left() { return this.x; }

    /**
     * The x-coordinate of the right side of the rectangle.
     * @type {number}
     */
    get right() { return this.x + this.width; }

    /**
    * The y-coordinate of the top side of the rectangle.
    * @type {number}
    */
    get top() { return this.y; }

    /**
    * The y-coordinate of the bottom side of the rectangle.
    * @type {number}
    */
    get bottom() { return this.y + this.height; }

    /**
     * `true` if the rectangle full rotation is done, `false` otherwise.
     * @type {boolean}
     */
    get isRotationDone() {
        return this.angle >= FULL_ROTATION;
    }



    /**
     * Sets the `rotating` flag to `true`.
     */
    activate() {
        this.rotating = true;
        console.log('%c  ' + '%c activated', `background: ${this.color};`, 'background: none');
    }

    /**
     * Rotates the rectangle one step.
     * If the new angle equals 360°, stops the rotation.
     * @param {number} [rotationStep = DEFAULT_ROTATION_STEP] - An angle in radian
     */
    rotate(rotationStep = DEFAULT_ROTATION_STEP) {
        if (!this.rotating) {
            return;
        }
        if (this.isRotationDone) {
            this.rotating = false;
        } else {
            const newAngle = this.angle + rotationStep;

            // just to avoid an angle greater than 360°
            this.angle = newAngle >= FULL_ROTATION ?
                FULL_ROTATION :
                newAngle;
        }
    }

    /**
     * Draws the rectangle in the target canvas context.
     * @param {CanvasRenderingContext2D} ctx - The 2d canvas context
     */
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

}

export default Rectangle;