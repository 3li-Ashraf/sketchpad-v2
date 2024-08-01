import { create } from "zustand";
import { compress, decompress } from "compress-json";

/**
 * Pixel interface.
 * @property {number} index - Index of the current color in the colorsArray.
 * @property {string[]} colorsArray - Array of colors that the pixel has been painted with.
 * @example
 * const pixel: Pixel = { index: 0, colorsArray: ["#FFFFFF"] };
 */
interface Pixel {
    index: number;
    colorsArray: string[];
}

/**
 * Store state interface.
 * @property {string} color - The current color.
 * @property {number} gridSize - The grid size.
 * @property {boolean} mirrorX - Whether to mirror horizontally.
 * @property {boolean} mirrorY - Whether to mirror vertically.
 * @property {boolean} gridLines - Whether to show grid lines.
 * @property {string[][]} undoArray - Array of modified pixels for undo.
 * @property {string[][]} redoArray - Array of modified pixels for redo.
 * @property {Pixel[][]} pixelsMatrix - Pixels matrix.
 * @property {"pen" | "eraser" | "colorfulPen" | "fill"} drawingTool - The current drawing tool.
 */
interface State {
    color: string;
    gridSize: number;
    mirrorX: boolean;
    mirrorY: boolean;
    gridLines: boolean;
    undoArray: string[][];
    redoArray: string[][];
    pixelsMatrix: Pixel[][];
    drawingTool: "pen" | "eraser" | "colorfulPen" | "fill";
}

/**
 * Store actions interface.
 * @property {() => void} undo - Undo the last drawing action.
 * @property {() => void} redo - Redo the last undone drawing action.
 * @property {() => void} saveGrid - Save the current grid to a JSON file and download it.
 * @property {() => void} loadGrid - Load a grid from a JSON file.
 * @property {() => void} clearGrid - Clear the pixel grid.
 * @property {() => void} screenshot - Take a screenshot of the grid.
 * @property {() => void} destructGrid - Destruct the pixel grid.
 * @property {() => void} constructGrid - Construct the pixel grid.
 * @property {() => void} toggleMirrorX - Toggle horizontal mirroring.
 * @property {() => void} toggleMirrorY - Toggle vertical mirroring.
 * @property {() => void} toggleGridLines - Toggle the visibility of grid lines.
 * @property {(color: string) => void} setColor - Set the current color.
 * @property {(i: number, j: number) => void} draw - Draw on the grid at specified coordinates.
 * @property {(gridSize: number) => void} setGridSize - Set the grid size, destruct old grid and construct new grid.
 * @property {(drawingTool: "pen" | "eraser" | "colorfulPen" | "fill") => void} setDrawingTool - Set the current drawing tool.
 * @property {(pixelsMatrix: Pixel[][], i: number, j: number, fillColor: string, matchingColor: string, modifiedPixels: string[]) => void} fill - Fill a contiguous area of the grid with a specified color.
 */
interface Actions {
    undo: () => void;
    redo: () => void;
    saveGrid: () => void;
    loadGrid: () => void;
    clearGrid: () => void;
    screenshot: () => void;
    destructGrid: () => void;
    constructGrid: () => void;
    toggleMirrorX: () => void;
    toggleMirrorY: () => void;
    toggleGridLines: () => void;
    setColor: (color: string) => void;
    draw: (i: number, j: number) => void;
    setGridSize: (gridSize: number) => void;
    setDrawingTool: (drawingTool: "pen" | "eraser" | "colorfulPen" | "fill") => void;
    fill: (pixelsMatrix: Pixel[][], i: number, j: number, fillColor: string, matchingColor: string, modifiedPixels: string[]) => void;
}

/**
 * Zustand store for managing grid state and actions.
 * @returns {State & Actions} - The store state and actions.
 * @example
 * const { gridSize, gridLines, draw, constructGrid } = useStore((state) => state);
 */
export const useStore = create<State & Actions>((set, get) => ({
    gridSize: 32,
    mirrorX: false,
    mirrorY: false,
    gridLines: true,
    color: "#000000",
    drawingTool: "pen",
    undoArray: [],
    redoArray: [],
    pixelsMatrix: [],

    /**
     * Set the current color.
     * @param {string} color - The new color.
     * @example
     * setColor("#000000");
     */
    setColor: (color) => set({ color }),

    /**
     * Set the grid size, destruct old grid and construct new grid.
     * @param {number} gridSize - The new grid size.
     * @example
     * setGridSize(32);
     */
    setGridSize: (gridSize) => {
        set({ gridSize });
        get().destructGrid();
        get().constructGrid();

    },

    /**
     * Set the current drawing tool.
     * @param {"pen" | "eraser" | "colorfulPen" | "fill"} drawingTool - The new drawing tool.
     * @example
     * setDrawingTool("pen");
     */
    setDrawingTool: (drawingTool) => set({ drawingTool }),

    /**
     * Toggle the visibility of grid lines.
     * @example
     * toggleGridLines();
     */
    toggleGridLines: () => set((state) => ({ gridLines: !state.gridLines })),

    /**
     * Toggle horizontal mirroring.
     * @example
     * toggleMirrorX();
     */
    toggleMirrorX: () => set((state) => ({ mirrorX: !state.mirrorX })),

    /**
     * Toggle vertical mirroring.
     * @example
     * toggleMirrorY();
     */
    toggleMirrorY: () => set((state) => ({ mirrorY: !state.mirrorY })),

    /**
     * Construct the pixel grid.
     * @example
     * constructGrid();
     */
    constructGrid: () => set((state) => {
        const gridSize = state.gridSize;
        const pixelsMatrix: Pixel[][] = new Array(gridSize);

        for (let i = 0; i < gridSize; i++) {
            pixelsMatrix[i] = new Array(gridSize);

            for (let j = 0; j < gridSize; j++) {
                pixelsMatrix[i][j] = {
                    index: 0,
                    colorsArray: ["#FFFFFF"]
                };
            }
        }

        return { pixelsMatrix };
    }),

    /**
     * Destruct the pixel grid.
     * @example
     * destructGrid();
     */
    destructGrid: () => set({
        undoArray: [],
        redoArray: [],
        pixelsMatrix: []
    }),

    /**
     * Clear the pixel grid.
     * @example
     * clearGrid();
     */
    clearGrid: () => {
        const { pixelsMatrix, undoArray, redoArray } = get();

        let allWhite = true;
        const modifiedPixels: string[] = [];
        const newPixelsMatrix = [...pixelsMatrix];

        newPixelsMatrix.forEach((row, i) => row.forEach((pixel, j) => {
            if (pixel.colorsArray[pixel.index] !== "#FFFFFF") {
                allWhite = false;
                pixel.index++;
                pixel.colorsArray[pixel.index] = "#FFFFFF";
                modifiedPixels.push(`${i},${j}`);
            }
        }));

        if (!allWhite) {
            // Clear the redoArray
            redoArray.length = 0;

            // Remove extra colors from the colorsArray of each pixel to prevent undo/redo issues
            newPixelsMatrix.forEach((row) => row.forEach((pixel) => pixel.colorsArray.length = pixel.index + 1));

            undoArray.push(modifiedPixels);
            set({ pixelsMatrix: newPixelsMatrix });
        }
    },

    /**
     * Draw on the grid at specified coordinates.
     * @param {number} i - The row index of the pixel.
     * @param {number} j - The column index of the pixel.
     * @example
     * draw(0, 0);
     */
    draw: (i, j) => {
        const {
            color,
            mirrorX,
            mirrorY,
            gridSize,
            undoArray,
            redoArray,
            drawingTool,
            pixelsMatrix
        } = get();

        const modifiedPixels: string[] = []; // Array of pixels that will be modified by the drawing tool
        const newPixelsMatrix = [...pixelsMatrix];
        const pixel = newPixelsMatrix[i][j];

        let newColor;
        switch (drawingTool) {
            case "pen":
                newColor = color;
                break;
            case "eraser":
                newColor = "#FFFFFF";
                break;
            case "colorfulPen":
                newColor = "#" + Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
                break;
            default:
                newColor = pixel.colorsArray[pixel.index]; // No change
                break;
        }

        if (pixel.colorsArray[pixel.index] !== newColor) {
            // Clear the redoArray
            redoArray.length = 0;

            // Remove extra colors from the colorsArray of each pixel to prevent undo/redo issues
            newPixelsMatrix.forEach((row) => row.forEach((pixel) => pixel.colorsArray.length = pixel.index + 1));

            pixel.colorsArray.push(newColor);
            pixel.index++;
            modifiedPixels.push(`${i},${j}`);

            const mirroredI = gridSize - i - 1;
            const mirroredJ = gridSize - j - 1;

            if (mirrorX) {
                newPixelsMatrix[mirroredI][j].colorsArray.push(newColor);
                newPixelsMatrix[mirroredI][j].index++;
                modifiedPixels.push(`${mirroredI},${j}`);
            }

            if (mirrorY) {
                newPixelsMatrix[i][mirroredJ].colorsArray.push(newColor);
                newPixelsMatrix[i][mirroredJ].index++;
                modifiedPixels.push(`${i},${mirroredJ}`);
            }

            if (mirrorX && mirrorY) {
                newPixelsMatrix[mirroredI][mirroredJ].colorsArray.push(newColor);
                newPixelsMatrix[mirroredI][mirroredJ].index++;
                modifiedPixels.push(`${mirroredI},${mirroredJ}`);
            }

            undoArray.push(modifiedPixels);
            set({ pixelsMatrix: newPixelsMatrix });
        }
        else if (drawingTool === "fill" && pixel.colorsArray[pixel.index] !== color) {
            // Clear the redoArray
            redoArray.length = 0;

            // Remove extra colors from the colorsArray of each pixel to prevent undo/redo issues
            newPixelsMatrix.forEach((row) => row.forEach((pixel) => pixel.colorsArray.length = pixel.index + 1));

            get().fill(newPixelsMatrix, i, j, color, pixel.colorsArray[pixel.index], modifiedPixels);

            undoArray.push(modifiedPixels);
            set({ pixelsMatrix: newPixelsMatrix });
        }
    },

    /**
     * Fill a contiguous area of the grid with a specified color.
     * @param {Pixel[][]} pixelsMatrix - The grid.
     * @param {number} i - The pixel row index.
     * @param {number} j - The pixel column index.
     * @param {string} fillColor - The color to fill with.
     * @param {string} matchingColor - The color to replace.
     * @param {string[]} modifiedPixels - The array of modified pixels.
     * @example
     * fill(pixelsMatrix, 0, 0, "#000000", "#FFFFFF", []);
     */
    fill: (pixelsMatrix, i, j, fillColor, matchingColor, modifiedPixels) => {
        if (i < 0 || i >= pixelsMatrix.length || j < 0 || j >= pixelsMatrix.length) return;
        if (pixelsMatrix[i][j].colorsArray[pixelsMatrix[i][j].index] !== matchingColor) return;

        pixelsMatrix[i][j].colorsArray.push(fillColor);
        pixelsMatrix[i][j].index++;
        modifiedPixels.push(`${i},${j}`);

        get().fill(pixelsMatrix, i + 1, j, fillColor, matchingColor, modifiedPixels);
        get().fill(pixelsMatrix, i - 1, j, fillColor, matchingColor, modifiedPixels);
        get().fill(pixelsMatrix, i, j + 1, fillColor, matchingColor, modifiedPixels);
        get().fill(pixelsMatrix, i, j - 1, fillColor, matchingColor, modifiedPixels);
    },

    /**
     * Undo the last drawing action.
     * @example
     * undo();
     */
    undo: () => {
        const { pixelsMatrix, undoArray, redoArray } = get();

        const modifiedPixels = undoArray.pop();
        if (!modifiedPixels) return;

        const newPixelsMatrix = [...pixelsMatrix];

        modifiedPixels.forEach((pixel) => {
            const [i, j] = pixel.split(',').map(Number);
            newPixelsMatrix[i][j].index--;
        });

        redoArray.push(modifiedPixels);

        set({ pixelsMatrix: newPixelsMatrix });
    },

    /**
     * Redo the last undone drawing action.
     * @example
     * redo();
     */
    redo: () => {
        const { pixelsMatrix, undoArray, redoArray } = get();

        const modifiedPixels = redoArray.pop();
        if (!modifiedPixels) return;

        const newPixelsMatrix = [...pixelsMatrix];

        modifiedPixels.forEach((pixel) => {
            const [i, j] = pixel.split(',').map(Number);
            newPixelsMatrix[i][j].index++;
        });

        undoArray.push(modifiedPixels);

        set({ pixelsMatrix: newPixelsMatrix });
    },

    /**
     * Take a screenshot of the grid.
     * @example
     * screenshot();
     */
    screenshot: () => {
        const { gridSize, pixelsMatrix } = get();

        const pixelSize = 50;
        const canvasWidth = gridSize * pixelSize;
        const canvasHeight = gridSize * pixelSize;

        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext("2d");

        if (ctx) {
            // Clear the canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Draw each pixel from pixelsMatrix
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const pixel = pixelsMatrix[i][j];
                    const color = pixel.colorsArray[pixel.index];

                    ctx.fillStyle = color;
                    ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
                }
            }

            // Convert the custom canvas to a downloadable image
            const a = document.createElement('a');
            a.href = canvas.toDataURL();
            a.download = "image.png";
            a.click();
            a.remove();
        }

        canvas.remove();
    },

    /**
     * Save the current grid to a JSON file and download it.
     * @example
     * saveGrid();
     */
    saveGrid: () => {
        // Serialize the grid data
        const serializedData = JSON.stringify(compress({
            0: get().gridSize,
            1: get().pixelsMatrix.flat().map(pixel => pixel.colorsArray[pixel.index])
        }));

        const blob = new Blob([serializedData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "data.json";
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    },

    /**
     * Load a grid from a JSON file.
     * @example
     * loadGrid();
     */
    loadGrid: () => {
        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        const file = fileInput.files![0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const serializedData = reader.result as string;

                if (validateSerializedData(serializedData)) {
                    const data = decompress(JSON.parse(serializedData));

                    const gridSize = data[0];
                    const colors = data[1];
                    const pixelsMatrix: Pixel[][] = new Array(gridSize);

                    for (let i = 0; i < gridSize; i++) {
                        pixelsMatrix[i] = new Array(gridSize);

                        for (let j = 0; j < gridSize; j++) {
                            pixelsMatrix[i][j] = {
                                index: 0,
                                colorsArray: [colors[i * gridSize + j]]
                            }
                        }
                    }

                    get().setGridSize(gridSize);
                    set({ pixelsMatrix });
                }
                else {
                    alert("Invalid file format or data. Please check the file and try again.");
                }

                fileInput.value = "";
            }

            reader.readAsText(file);
        }
    }
}));

/**
 * Validate the serialized data.
 * @param {string} serializedData - The serialized data to validate.
 * @returns {boolean} - Whether the serialized data is valid.
 * @example
 * validateSerializedData(serializedData);
 */
const validateSerializedData = (serializedData: string) => {
    try {
        // Decompress the serialized data
        const data = decompress(JSON.parse(serializedData));

        // Check if the object has exactly 2 keys
        if (Object.keys(data).length !== 2) return false;

        // Check if the grid size is a number between 1 and 64
        if (typeof data[0] !== "number" || data[0] < 1 || data[0] > 64) return false;

        // Check if the colors array has the correct length
        if (!Array.isArray(data[1]) || data[1].length !== data[0] * data[0]) return false;

        // Check if each color is a string in the format "#RRGGBB"
        for (const color of data[1]) {
            if (typeof color !== "string" || !color.match(/^#([A-Fa-f0-9]{6})$/)) {
                return false;
            }
        }

        return true;
    }
    catch {
        return false;
    }
}