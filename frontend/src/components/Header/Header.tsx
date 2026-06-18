import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation'

export default function Header() {
    function logout() {}

    return (
        <header className=''>
            <Logo />
            <Navigation />
            <button onClick={logout}>Logout</button>
        </header>
    )
}

