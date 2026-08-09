import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Header from "./header/Header";
import Footer from "./footer/Footer";

function MainLayout() {
    return (
        <div>
            <Toaster position="bottom-right" richColors />
            <Header />
            <main className="flex mt-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;