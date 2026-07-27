import { useState } from "react"
import { Link } from "react-router"
import Button from "@/components/common/Button"
import { ArrowDownIcon, LogoIcon, MenuBurger } from "@/components/common/Icons"
import UserAvatar from "@/components/common/UserAvatar"
import Menu from "@/components/common/Menu"
function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <header className="flex justify-center ite gap-2.5 h-15 px-2.5 bg-background-main border-b-border">
            <div className="flex max-w-page-content px-2.5 justify-between items-center w-full">
                <div className="flex items-center gap-2.5">
                    <Button variant="text" className="text-text-main">
                        <MenuBurger />
                    </Button>
                    <Link to="/" className="flex items-center gap-1 cursor-pointer">
                        <LogoIcon className="text-primary-600" />
                        <h1 id="login-title" className="text-text-main font-text-medium">
                            FocusFlow
                        </h1>
                    </Link>
                </div>
                <div className="flex justify-end items-center relative">
                    <Button onClick={toggleMenu} variant="text" className="text-text-main p-1 gap-0.5 ">
                        <UserAvatar />
                        <ArrowDownIcon />
                    </Button>
                    <Menu isOpen={isOpen} onClose={() => { setIsOpen(false); }} />
                </div>
            </div>
        </header>
    )
}

export default Header