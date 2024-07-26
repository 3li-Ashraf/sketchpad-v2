import { useState, useCallback } from "react";
import SettingsIcon from '@mui/icons-material/Settings';

export const Header: React.FC = () => {
    const [settingsVisible, setSettingsVisible] = useState(false);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        const settings = document.getElementById("settings")!;
        const settingsButton = document.getElementById("settingsButton")!;

        if (!settings.contains(event.target as Node) && !settingsButton.contains(event.target as Node)) {
            setSettingsVisible(false);
            settings.style.display = "none";
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const settings = document.getElementById("settings")!;

        if (settingsVisible) {
            settings.style.display = "none";
            document.removeEventListener("click", handleClickOutside);
        }
        else {
            settings.style.display = "flex";
            document.addEventListener("click", handleClickOutside);
        }

        setSettingsVisible(prev => !prev);
    }

    return (
        <header className="relative md:static text-[#3ea6ff] bg-[#181818] text-2xl sm:text-4xl lg:text-5xl text-center font-pixeled py-7">
            <button
                id="settingsButton"
                style={{
                    color: settingsVisible ? "#181818" : "#3ea6ff",
                    backgroundColor: settingsVisible ? "#3ea6ff" : "#181818"
                }}
                onClick={handleButtonClick}
                className="md:hidden absolute flex justify-center items-center top-auto left-[5vw] w-8 sm:w-10 h-8 sm:h-10 border border-[#3ea6ff] rounded-md transition-colors duration-75"
            >
                <SettingsIcon className={settingsVisible ? "animate-spin" : "animate-spin-slow"} />
            </button>
            <h1>Sketchpad</h1>
        </header>
    )
}