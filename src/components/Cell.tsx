import { interpolateCells } from "../models/InterpolationInfo";
import Pixel from "../models/Pixel";
import { useStore } from "../store/store";

interface CellProps {
    i: number;
    j: number;
    pixel: Pixel;
}

const Cell: React.FC<CellProps> = ({ i, j, pixel }) => {
    const gridLines = useStore((state) => state.gridLines);
    const interpolationInfo = useStore((state) => state.interpolationInfo);

    const draw = useStore((state) => state.draw);
    const updateInterpolationInfo = useStore((state) => state.updateInterpolationInfo);

    // Draws the event target cell
    const drawEventTarget = (target: EventTarget, ownerDraw: boolean = false) => {
        const cell = target as HTMLDivElement;
        const x = Number(cell.dataset.i);
        const y = Number(cell.dataset.j);

        const delegate = () => {
            if (!isNaN(x) && !isNaN(y)) {
                draw(x, y);
            }
        };

        // draw cell if owner wont handle it
        if (!ownerDraw) {
            delegate();
        }

        return { cell, x, y, delegate };
    };

    const drawCellInterpolated = (target: EventTarget) => {
        // get current cell info
        const { cell, x, y, delegate } = drawEventTarget(target, true);

        // try to interpolate cells
        const currentTime = Date.now();
        interpolateCells(x, y, currentTime, interpolationInfo, draw);

        // draw actual cell
        delegate();

        // update interpolation info
        updateInterpolationInfo(cell, currentTime);
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        // keep one touch event
        if (event.touches.length === 1) {
            drawEventTarget(event.target);
        }
    };

    // Handle touch move events to draw on the grid
    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        if (event.touches.length > 0) {
            // get cell at touch position
            const cell = document.elementFromPoint(
                event.touches[0].clientX,
                event.touches[0].clientY
            ) as HTMLDivElement;

            if (cell != null && cell.dataset.i && cell.dataset.j) {
                drawCellInterpolated(cell as EventTarget);
            }
        }
    };

    // Handle mouse enter events to draw on the grid
    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.buttons === 1) {
            drawCellInterpolated(event.target);
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // cancel context menu
        event.preventDefault();

        if (event.buttons === 1) {
            drawEventTarget(event.target);
        }
    };

    return (
        <div
            data-i={i}
            data-j={j}
            style={{
                backgroundColor: pixel.colorsArray[pixel.index],
                outline: gridLines ? "1px solid #9c9c9c" : "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onContextMenu={(event) => event.preventDefault()}
        />
    );
};

export default Cell;