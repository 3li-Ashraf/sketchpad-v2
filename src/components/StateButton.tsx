import Tooltip from "@mui/material/Tooltip";

interface StateButtonProps {
    children: React.ReactNode;
    title: string;
    isActive: boolean;
    handleClick: () => void;
}

const StateButton: React.FC<StateButtonProps> = ({ children, title, isActive, handleClick }) => {
    return (
        <div className="flex justify-center items-center">
            <Tooltip title={title} arrow>
                <button
                    style={{
                        color: isActive ? "#181818" : "#3ea6ff",
                        backgroundColor: isActive ? "#3ea6ff" : "#181818",
                    }}
                    onClick={handleClick}
                    className="flex justify-center items-center text-xl w-10 h-10 border border-[#3ea6ff] rounded-md transition-colors duration-75"
                >
                    {children}
                </button>
            </Tooltip>
        </div>
    )
}

export default StateButton;