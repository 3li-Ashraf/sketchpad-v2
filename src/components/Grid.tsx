import { useEffect } from "react";
import { useStore } from "../store/store";

export const Grid: React.FC = () => {
    const {
        gridSize,
        gridLines,
        pixelsMatrix,
        draw,
        constructGrid,
        destructGrid
    } = useStore((state) => state);

    useEffect(() => {
        constructGrid();
        return destructGrid;
    }, []);

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        const touch = event.targetTouches[0];
        const div = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLDivElement;
        if (div && div.dataset && div.dataset.i && div.dataset.j) {
            draw(Number(div.dataset.i), Number(div.dataset.j));
        }
    }

    return (
        <div className="touch-none text-[#3ea6ff] bg-[#181818] border border-[#3ea6ff] rounded-md w-[360px] sm:w-[580px] md:w-[570px] lg:w-[680px] xl:w-[780px] h-[360px] sm:h-[580px] md:h-[570px] lg:h-[680px] xl:h-[780px] p-[10px] sm:p-[15px] lg:p-[20px] xl:p-[30px]">
            {/* Grid */}
            <div
                id="grid"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                }}
                className="h-full grid bg-white border border-[#9c9c9c]"
            >
                {pixelsMatrix.map((row, i) => (
                    row.map((pixel, j) => (
                        <div
                            key={`${i},${j}`}
                            data-i={i}
                            data-j={j}
                            style={{
                                backgroundColor: pixel.colorsArray[pixel.index],
                                borderTop: gridLines ? "1px solid #9c9c9c" : "",
                                borderLeft: gridLines ? "1px solid #9c9c9c" : "",
                                borderRight: (gridLines && j === (gridSize - 1)) ? "1px solid #9c9c9c" : "",
                                borderBottom: (gridLines && i === (gridSize - 1)) ? "1px solid #9c9c9c" : "",
                            }}
                            onMouseDown={() => draw(i, j)}
                            onMouseEnter={({ buttons }) => { if (buttons === 1) draw(i, j) }}
                            onTouchStart={() => draw(i, j)}
                            onTouchMove={handleTouchMove}
                        >
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}