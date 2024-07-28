import Tooltip from "@mui/material/Tooltip";

interface ActionButtonProps {
    children: React.ReactNode;
    title: string;
    callback: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ children, title, callback }) => {
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        button.style.setProperty("color", "#181818");
        button.style.setProperty("background-color", "#3ea6ff");
        callback();
    }

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        button.style.setProperty("color", "#3ea6ff");
        button.style.setProperty("background-color", "#181818");
    }

    return (
        <div className="flex justify-center items-center">
            <Tooltip title={title} arrow>
                <button
                    id={title.toLowerCase() + "Button"}
                    onClick={handleButtonClick}
                    onTransitionEnd={handleTransitionEnd}
                    className="flex justify-center items-center text-xl w-10 h-10 border border-[#3ea6ff] rounded-md transition-colors duration-75"
                >
                    {children}
                </button>
            </Tooltip>
        </div>
    )
}