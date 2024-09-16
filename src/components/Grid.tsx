import { useEffect } from "react";
import { useStore } from "../store/store";
import Cell from "./Cell";

const Grid: React.FC = () => {
    // Extract state and actions from the store
    const gridSize = useStore((state) => state.gridSize);
    const pixelsMatrix = useStore((state) => state.pixelsMatrix);
    
    const constructGrid = useStore((state) => state.constructGrid);

    // Initialize grid on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(constructGrid, []);

    return (
        <div className="touch-none text-[#3ea6ff] bg-[#181818] border border-[#3ea6ff] rounded-md w-[360px] sm:w-[580px] md:w-[570px] lg:w-[680px] xl:w-[780px] h-[360px] sm:h-[580px] md:h-[570px] lg:h-[680px] xl:h-[780px] p-[10px] sm:p-[15px] lg:p-[20px] xl:p-[30px]">
            {/* Grid */}
            <div
                id="grid"
                className="grid h-full bg-[#181818]"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                }}
            >
                {pixelsMatrix.map((row, i) =>
                    row.map((pixel, j) => (
                        <Cell key={`${i},${j}`} i={i} j={j} pixel={pixel} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Grid;