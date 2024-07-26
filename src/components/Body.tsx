import { Grid } from "./Grid";
import { Settings } from "./Settings";

export const Body: React.FC = () => {
    return (
        <div className="flex flex-auto items-center justify-around 2xl:justify-center 2xl:relative text-[#3ea6ff] bg-[#181818]">
            <Settings />
            <Grid />
        </div>
    )
}