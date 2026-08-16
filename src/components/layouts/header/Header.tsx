import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import Button from "@/components/common/Button";
import {
  ArrowDownIcon,
  ChevronLeftIcon,
  LogoIcon,
  MenuBurger,
} from "@/components/common/Icons";
import UserAvatar from "@/components/common/UserAvatar";
import Menu from "@/components/common/Menu";
import Drawer from "@/components/layouts/drawer/Drawer";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isFocusMode = location.pathname === "/focus-mode";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleBackToHome = () => {
    const workspaceParam = searchParams.get("workspace");
    const targetPath = workspaceParam ? `/?workspace=${workspaceParam}` : "/";
    void navigate(targetPath);
  };

  if (isFocusMode) {
    return (
      <header className="flex justify-center items-center gap-2.5 h-15 px-2.5 bg-background-main border-b border-border">
        <div className="flex max-w-page-content px-2.5 justify-start items-center w-full">
          <Button
            onClick={handleBackToHome}
            variant="outlined"
            leftIcon={
              <ChevronLeftIcon className="w-4 h-4 text-text-main shrink-0" />
            }
            className="font-text-medium text-text-main px-3 py-1.5"
          >
            Back
          </Button>
        </div>
      </header>
    );
  }

  return (
    <header className="flex justify-center items-center gap-2.5 h-15 px-2.5 bg-background-main border-b border-border">
      <div className="flex max-w-page-content px-2.5 justify-between items-center w-full">
        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => {
              setIsDrawerOpen(true);
            }}
            variant="text"
            className="text-text-main"
          >
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
          <Button
            onClick={toggleMenu}
            variant="text"
            className="text-text-main p-1 gap-0.5"
          >
            <UserAvatar />
            <ArrowDownIcon />
          </Button>
          <Menu
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
      />
    </header>
  );
}

export default Header;
