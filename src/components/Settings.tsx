import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { HiPencil } from "react-icons/hi2";
import { BiSolidEraser } from "react-icons/bi";
import { IoMdColorFill } from "react-icons/io";
import { GrClearOption } from "react-icons/gr";
import { FaWandMagicSparkles } from "react-icons/fa6";
import GridOnIcon from '@mui/icons-material/GridOn';
import CameraIcon from '@mui/icons-material/Camera';
import DensityLargeIcon from '@mui/icons-material/DensityLarge';
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import { useStore } from "../store/store";
import { StateButton } from "./StateButton";
import { ActionButton } from "./ActionButton";

export const Settings: React.FC = () => {
    const {
        color,
        mirrorX,
        mirrorY,
        gridSize,
        gridLines,
        drawingTool,
        undo,
        redo,
        setColor,
        saveGrid,
        loadGrid,
        clearGrid,
        screenshot,
        setGridSize,
        destructGrid,
        constructGrid,
        toggleMirrorX,
        toggleMirrorY,
        setDrawingTool,
        toggleGridLines,
    } = useStore((state) => state);

    return (
        <div id="settings" className="hidden md:flex flex-col justify-between absolute md:static 2xl:absolute top-auto left-[2vw] h-[580px] md:h-[570px] lg:h-[680px] xl:h-[780px] text-[#3ea6ff] bg-[#181818] border border-[#3ea6ff] rounded-md p-6 lg:p-8" >
            {/* Title */}
            <h2 className="font-pixeled text-center text-lg">Settings</h2>

            {/* Grid Size Slider */}
            <div className="flex flex-col">
                <p className="text-lg text-center">{gridSize} X {gridSize}</p>
                <Slider
                    min={1}
                    max={64}
                    value={gridSize}
                    onChange={(_, value) => {
                        setGridSize(value as number);
                        destructGrid();
                        constructGrid();
                    }}
                />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 lg:gap-5 xl:gap-8">

                {/* Pen */}
                <StateButton
                    title="Pen"
                    isActive={drawingTool === "pen"}
                    handleClick={() => setDrawingTool("pen")}
                >
                    <HiPencil />
                </StateButton>

                {/* Color Picker */}
                <div className="flex justify-center items-center">
                    <Tooltip title="Color" arrow>
                        <button
                            style={{ backgroundColor: color }}
                            className=" flex justify-center items-center text-xl w-10 h-10 border border-[#3ea6ff] rounded-md transition-colors duration-75"
                        >
                            <input
                                type="color"
                                id="colorPicker"
                                className="opacity-0 w-9 h-9 cursor-pointer"
                                onChange={({ target }) => setColor(target.value)}
                            />
                        </button>
                    </Tooltip>
                </div>

                {/* Colorful Pen */}
                <StateButton
                    title="Colorful Pen"
                    isActive={drawingTool === "colorfulPen"}
                    handleClick={() => setDrawingTool("colorfulPen")}
                >
                    <FaWandMagicSparkles />
                </StateButton>

                {/* Fill */}
                <StateButton
                    title="Fill"
                    isActive={drawingTool === "fill"}
                    handleClick={() => setDrawingTool("fill")}
                >
                    <IoMdColorFill />
                </StateButton>

                {/* Clear Grid */}
                <ActionButton
                    title="Clear Grid"
                    callback={clearGrid}
                >
                    <GrClearOption />
                </ActionButton>

                {/* Eraser */}
                <StateButton
                    title="Eraser"
                    isActive={drawingTool === "eraser"}
                    handleClick={() => setDrawingTool("eraser")}
                >
                    <BiSolidEraser />
                </StateButton>

                {/* Grid Lines*/}
                <StateButton
                    title="Grid Lines"
                    isActive={gridLines}
                    handleClick={toggleGridLines}
                >
                    <GridOnIcon />
                </StateButton>

                {/* Screenshot */}
                <ActionButton
                    title="Screenshot"
                    callback={screenshot}
                >
                    <CameraIcon />
                </ActionButton>

                {/* Mirror X */}
                <StateButton
                    title="Mirror X"
                    isActive={mirrorX}
                    handleClick={toggleMirrorX}
                >
                    <DensityLargeIcon />
                </StateButton>

                {/* Mirror Y */}
                <StateButton
                    title="Mirror Y"
                    isActive={mirrorY}
                    handleClick={toggleMirrorY}
                >
                    <DensityLargeIcon style={{ transform: 'rotate(90deg)' }} />
                </StateButton>

                {/* Undo */}
                <ActionButton
                    title="Undo"
                    callback={undo}
                >
                    <FaUndo />
                </ActionButton>

                {/* Redo */}
                <ActionButton
                    title="Redo"
                    callback={redo}
                >
                    <FaRedo />
                </ActionButton>

                {/* Save Grid */}
                <ActionButton
                    title="Save Grid"
                    callback={saveGrid}
                >
                    <FiDownload />
                </ActionButton>

                {/* Load Grid */}
                <ActionButton
                    title="Load Grid"
                    callback={() => document.getElementById("fileInput")!.click()}
                >
                    <FiUpload />
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        accept="application/json"
                        onChange={loadGrid}
                    />
                </ActionButton>

            </div>
        </div >
    )
}