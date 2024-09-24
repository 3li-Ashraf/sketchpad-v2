import Grid from "./Grid";
import Settings from "./Settings";

const Main: React.FC = () => {
    return (
        <main className="flex flex-auto items-center justify-around 2xl:justify-center 2xl:relative text-[#3ea6ff] bg-[#181818]">
            <Settings />
            <Grid />
        </main>
    )
}

export default Main;