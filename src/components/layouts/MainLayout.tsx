import { Outlet } from "react-router"
import Header from "./header/Header"
import Footer from "./footer/Footer"
function MainLayout() {
    return (
        <div>
            <Header />
            <main className="flex mt-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout