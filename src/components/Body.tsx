import { useEffect } from "react";
import { Grid } from "./Grid";
import { Settings } from "./Settings";

export const Body: React.FC = () => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) {
                if (event.key === 'z') document.getElementById("undoButton")!.click();
                if (event.key === 'y') document.getElementById("redoButton")!.click();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="flex flex-auto items-center justify-around 2xl:justify-center 2xl:relative text-[#3ea6ff] bg-[#181818]">
            <Settings />
            <Grid />
        </div>
    )
}