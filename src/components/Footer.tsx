export const Footer: React.FC = () => {
    return (
        <footer className="text-[#3ea6ff] bg-[#181818] text-center text-lg py-2">
            <p>Copyright &copy; {new Date().getFullYear().toString()} by <a href="https://github.com/3li-ashraf">Ali Ashraf</a></p>
        </footer>
    )
}