import { useEffect } from "react"
import { Header } from "./Header"
import { Main } from "./Main"
import { Footer } from "./Footer"

export const App: React.FC = () => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) {
                if (event.key === 'z') document.getElementById("undoButton")!.click();
                if (event.key === 'y') document.getElementById("redoButton")!.click();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="flex flex-col h-full select-none font-main text-[#3ea6ff] bg-[#181818]">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};