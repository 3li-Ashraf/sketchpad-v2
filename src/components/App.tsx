import { Header } from "./Header"
import { Body } from "./Body"
import { Footer } from "./Footer"

export const App: React.FC = () => {
  return (
    <div className="flex flex-col h-full select-none font-main text-[#3ea6ff] bg-[#181818]">
      <Header />
      <Body />
      <Footer />
    </div>
  )
}