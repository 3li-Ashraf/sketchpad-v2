import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

const App: React.FC = () => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) {
                if (event.key === 'z') document.getElementById("undoButton")!.click();
                if (event.key === 'y') document.getElementById("redoButton")!.click();
            }
        };

        // add shortcuts event listener
        document.addEventListener("keydown", handleKeyDown);

        // remove shortcuts event listener
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="flex flex-col h-full select-none font-main text-[#3ea6ff] bg-[#181818]">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default App;