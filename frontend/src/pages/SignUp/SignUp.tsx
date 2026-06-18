import { NavLink } from 'react-router-dom'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import './SignUp.scss'

export default function SignUp() {
    return (
        <div className='register-page'>
            <SignUpForm />
            <div className='register-page__extra-info'>
                <span>Already have an account?</span>
                <NavLink className='register-page__extra-info--link' to='/signin'>
                    Sign In
                </NavLink>
            </div>
        </div>
    )
}

