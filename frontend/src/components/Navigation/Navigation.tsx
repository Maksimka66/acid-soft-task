import { NavLink } from 'react-router-dom'

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/workout-list'>Workout</NavLink>
                </li>
            </ul>
        </nav>
    )
}

