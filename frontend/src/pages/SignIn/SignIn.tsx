import { NavLink } from 'react-router-dom'
import SignInForm from '../../components/SignInForm/SignInForm'
import './SignIn.scss'

export default function SignIn() {
    return (
        <div className='login-page'>
            <SignInForm />
            <div className='login-page__extra-info'>
                <span>Don`t have an account?</span>
                <NavLink className='login-page__extra-info--link' to='/signup'>
                    Sign Up
                </NavLink>
            </div>
        </div>
    )
}

