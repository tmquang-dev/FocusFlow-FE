import { Outlet } from "react-router"
function MainLayout() {
    return (
        <div>
            <header>this is header</header>
            <Outlet />
            <footer>this is footer</footer>
        </div>
    )
}

export default MainLayout