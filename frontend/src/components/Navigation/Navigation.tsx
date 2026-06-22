import { NavLink } from 'react-router-dom'
import './Navigation.scss'

export default function Navigation() {
    return (
        <nav className='navigation'>
            <ul className='navigation__list'>
                <li className='navigation__list-item'>
                    <NavLink className='navigation__link' to='/workout-list'>
                        Workouts
                    </NavLink>
                </li>
                <li className='navigation__list-item'>
                    <NavLink className='navigation__link' to='/workout-history'>
                        History
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

