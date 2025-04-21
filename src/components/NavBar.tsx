import { NavLink } from 'react-router'

export function NavBar() {
    return (
        <header>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    {/* <li><NavLink to="schedule">Schedule</NavLink></li> */}
                    <li><NavLink to="jams">Jams</NavLink></li>
                    <li><NavLink to="blog">Blog</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}