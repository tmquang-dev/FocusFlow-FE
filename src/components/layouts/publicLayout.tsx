import { Outlet } from 'react-router'

function publicLayout() {
    return (
        <div>
            <header>Header</header>
            <Outlet />
            <footer>Footer</footer>
        </div>
    )
}

export default publicLayout