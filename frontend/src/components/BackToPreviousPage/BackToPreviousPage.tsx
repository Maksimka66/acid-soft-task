import { NavLink } from 'react-router-dom'
import Back from '../../icons/Back/Back'
import type { BackToPreviousPageProps } from '../../interfaces/props/shared/shared'
import './BackToPreviousPage.scss'

export default function BackToPreviousPage({ to, children }: BackToPreviousPageProps) {
    return (
        <NavLink className='back-link' to={to}>
            <Back />
            {children}
        </NavLink>
    )
}

