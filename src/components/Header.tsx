import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';

export const Header: React.FC = () => {
    const [settingsVisible, setSettingsVisible] = useState(false);

    const handleClick = () => {
        const settings = document.getElementById("settings")!;

        if (settingsVisible) {
            settings.style.display = "none";
        }
        else {
            settings.style.display = "flex";
        }

        setSettingsVisible(prev => !prev);
    }

    return (
        <header className="relative md:static text-[#3ea6ff] bg-[#181818] text-2xl sm:text-4xl lg:text-5xl text-center font-pixeled py-7">
            <button
                style={{
                    color: settingsVisible ? "#181818" : "#3ea6ff",
                    backgroundColor: settingsVisible ? "#3ea6ff" : "#181818"
                }}
                onClick={handleClick}
                className="md:hidden absolute flex justify-center items-center top-auto left-[5vw] w-8 sm:w-10 h-8 sm:h-10 border border-[#3ea6ff] rounded-md transition-colors duration-75"
            >
                <SettingsIcon className={settingsVisible ? "animate-spin" : "animate-spin-slow"} />
            </button>
            <h1>Sketchpad</h1>
        </header>
    )
}