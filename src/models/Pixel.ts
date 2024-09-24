/**
 * Pixel interface.
 * @property {number} index - Index of the current color in the colorsArray.
 * @property {string[]} colorsArray - Array of colors that the pixel has been painted with.
 * @example
 * const pixel: Pixel = { index: 0, colorsArray: ["#FFFFFF"] };
 */
export default interface Pixel {
    index: number;
    colorsArray: string[];
}