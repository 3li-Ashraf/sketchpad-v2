/**
 * Represents information about grid cells interpolation.
 * @property {HTMLDivElement | null} cell - The last drawn cell.
 * @property {number} x - The last drawn x-coordinate.
 * @property {number} y - The last drawn y-coordinate.
 * @property {number} time - The last drawn time.
 */
export default interface InterpolationInfo {
    cell: HTMLDivElement | null;
    x: number;
    y: number;
    time: number;
}

/**
 * Interpolates cells between a point and the last drawn point using Bresenham's algorithm.
 * @param {number} x1 - The x-coordinate of the end point.
 * @param {number} y1 - The y-coordinate of the end point.
 * @param {number} currentTime - The current time.
 * @param {InterpolationInfo} interpolationInfo - The interpolation information.
 * @param {Function} draw - The draw function.
 * @returns {number} The number of drawn cells.
 */
export const interpolateCells = (
    x1: number,
    y1: number,
    currentTime: number,
    interpolationInfo: InterpolationInfo,
    draw: (x: number, y: number) => boolean
) => {
    if (interpolationInfo.cell == null || currentTime - interpolationInfo.time > 100)
        return 0;

    let numDrawn = 0;

    // get start and end points
    const x0 = interpolationInfo.x;
    const y0 = interpolationInfo.y;

    // calculate deltas
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);

    // calculate steps
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;

    // calculate error
    let err = dx - dy;

    // current position
    let xCurrent = x0;
    let yCurrent = y0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        // draw current pixel
        if (draw(xCurrent, yCurrent)) {
            numDrawn++;
        }

        // are we done?
        if (xCurrent === x1 && yCurrent === y1) break;

        // update error and current position
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            xCurrent += sx;
        }
        if (e2 < dx) {
            err += dx;
            yCurrent += sy;
        }
    }

    return numDrawn;
};