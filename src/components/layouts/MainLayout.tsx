import { Outlet } from "react-router"
function MainLayout() {
    return (
        <div>
            <header>This is header</header>
            <Outlet />
            <footer>This is footer</footer>
        </div>
    )
}

export default MainLayout