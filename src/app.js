import Rectangle from './Rectangle';
import { lastElement } from './utils/array';
import { randomInt } from './utils/math';
import { isCanvasSupported, randomRGB } from './utils/browser';

// track whether the user is currently drawing or not
let drawing = false;
// cursor coordinates when drawing starts
let drawingStartCoords = {};
// cursor coordinates when drawing ends
let drawingEndCoords = {};
// current drawing color
let drawingColor;

// collect all the rectangle added to the scene
let rectangles = [];

// minimum height and width for a rectangle to be added to the scene
const MIN_WIDTH = 10;
const MIN_HEIGHT = 10;

// for multi-browser support purpose...
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


// Check canvas support
if (!isCanvasSupported(document)) {
    document.getElementById('app').appendChild(
        document.createTextNode('Your browser doesn\'t support HTML5! It is time to update ;-)')
    );
}

// Create the canvas HTML element
const canvas = document.createElement('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.getElementById('app').appendChild(canvas);

// On mousedown, activate mousemove event listener
canvas.addEventListener('mousedown', e => canvas.addEventListener('mousemove', mouseMove));
// On mouseup, stop drawing
canvas.addEventListener('mouseup', stopDrawing);
// Double-clicking on a rectangle activates it.
canvas.addEventListener('dblclick', e => {
    const selectedRectangle = getRectangleAt(e.offsetX, e.offsetY);
    if (selectedRectangle) {
        selectedRectangle.activate();
    }
});

/**
 * Records the cursor coordinates.
 * @param {MouseEvent} e - The MouseEvent.
 */
function mouseMove(e) {
    const newCoords = { x: e.offsetX, y: e.offsetY };
    // Start drawing a new rectangle
    if (!drawing) {
        startDrawing(newCoords);
    }
    // Record the cursor new coordinates
    drawingEndCoords = newCoords;
}

/**
 * Starts drawing.
 */
function startDrawing(coords) {
    drawing = true;
    drawingColor = randomRGB();
    drawingStartCoords = coords;
}

/**
 * Stops listening to mouse moves and adds the rectangle
 * drawn by the user to the scene.
 */
function stopDrawing() {
    // Stop listening mousemove event 
    canvas.removeEventListener('mousemove', mouseMove);

    // Stop drawing new rectangle
    if (drawing) {
        drawing = false;

        // Add the new rectangle
        const width = Math.abs(drawingStartCoords.x - drawingEndCoords.x);
        const height = Math.abs(drawingStartCoords.y - drawingEndCoords.y);
        if (width > MIN_WIDTH && height > MIN_HEIGHT) {
            rectangles.push(new Rectangle(
                Math.min(drawingStartCoords.x, drawingEndCoords.x),
                Math.min(drawingStartCoords.y, drawingEndCoords.y),
                width,
                height,
                drawingColor
            ));
        }
    }
}


/**
 * Returns the top layer rectangle which area matches the input coordinates.
 * @param {Number} x - A x-coordinate
 * @param {Number} y - A y-coordinate
 */
function getRectangleAt(x, y) {
    const areaMatchesCoordinates = ({ right, left, bottom, top }) =>
        right >= x &&
        left <= x &&
        bottom >= y &&
        top <= y;
    // returns the last rectangle that matches the coordinates 
    return lastElement(areaMatchesCoordinates)(rectangles);
}


/**
 * Removes all rectangles which rotation is done,
 * if no more rectangle is currently rotating.
 */
function clearRectangles() {
    if (!rectangles.some(rect => rect.rotating)) {
        rectangles = rectangles.filter(rect => !rect.isRotationDone);
    }
}

/**
 * Rendering loop.
 * Clears and re-draws the whole scene.
 * @param {CanvasRenderingContext2D} ctx - A 2D canvas rendering context
 */
(function renderLoop(ctx) {
    // clean the scene
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // render existing rectangles
    rectangles.forEach(rect => {
        const { x, y, width, height, color, angle } = rect;
        rect.draw(ctx);
        // rotate on step the rectangle
        rect.rotate();
    });

    // render the new rectangle beeing drawn by the user
    if (drawing) {
        const width = Math.abs(drawingStartCoords.x - drawingEndCoords.x);
        const height = Math.abs(drawingStartCoords.y - drawingEndCoords.y);
        const x = Math.min(drawingStartCoords.x, drawingEndCoords.x);
        const y = Math.min(drawingStartCoords.y, drawingEndCoords.y)

        const newRect = new Rectangle(x, y, width, height, drawingColor);
        newRect.draw(ctx);
    }

    // remove the rectangles that have been activated
    // if no more rectangle is currently rotating
    clearRectangles();

    // loop
    requestAnimationFrame(() => renderLoop(ctx));
})(canvas.getContext('2d', { alpha: false }));