import { NavLink } from 'react-router-dom'
import Back from '../../icons/Back/Back'
import './BackToPreviousPage.scss'

export default function BackToPreviousPage({ to, children }) {
    return (
        <NavLink className='back-link' to={to}>
            <Back />
            {children}
        </NavLink>
    )
}

