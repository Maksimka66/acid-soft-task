import { NavLink } from 'react-router-dom'
import Back from '../../icons/Back/Back'

export default function BackToPreviousPage({ to, children }) {
    return (
        <div className='back-link-layout'>
            <Back />
            <NavLink to={to}>{children}</NavLink>
        </div>
    )
}

