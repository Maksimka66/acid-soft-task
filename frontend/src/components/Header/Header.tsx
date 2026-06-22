import { useSelector } from 'react-redux'
import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation'
import LogoutButton from '../LogoutButton/LogoutButton'
import { selectAccessToken, selectUsername } from '../../store/auth/authSlice'
import './Header.scss'

export default function Header() {
    const accessToken = useSelector(selectAccessToken)
    const username = useSelector(selectUsername)

    return (
        <header className='header'>
            <Logo />
            <Navigation />
            <div className='header__container'>
                <LogoutButton />
                {accessToken && <span className='header__username'>Hello, {username}</span>}
            </div>
        </header>
    )
}

