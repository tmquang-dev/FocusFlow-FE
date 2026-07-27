import { Outlet } from "react-router"
import Header from "./header/Header"
import Footer from "./footer/Footer"
function MainLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout