const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-[#3ea6ff] bg-[#181818] text-center text-lg py-2">
            <p>
                Copyright &copy; {currentYear} by{" "}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    href="https://github.com/3li-ashraf"
                >
                    Ali Ashraf
                </a>
            </p>
        </footer>
    )
}

export default Footer;