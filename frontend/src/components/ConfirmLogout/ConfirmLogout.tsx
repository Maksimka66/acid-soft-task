import { useDispatch } from 'react-redux'
import { useLogOutMutation } from '../../store/auth/authApi'
import { removeTokens } from '../../store/auth/authSlice'
import Loader from '../Loader/Loader'
import { errorMessage, successMessage } from '../../utils/toastMessage'
import './ConfirmLogout.scss'

export default function ConfirmLogout({ toggleModal }) {
    const [handleLogout, { isLoading }] = useLogOutMutation()

    const dispatch = useDispatch()

    async function logoutUser() {
        try {
            await handleLogout({}).unwrap()

            dispatch(removeTokens())

            successMessage('Successful logout!')
        } catch (e) {
            console.log(e)

            errorMessage(e.data.message)
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <p className='text'>Are you sure you want to logout?</p>
            <div className='buttons-container'>
                <button
                    className='buttons-container__button buttons-container__button--fulfill'
                    onClick={logoutUser}
                >
                    Yes
                </button>
                <button
                    className='buttons-container__button buttons-container__button--reject'
                    onClick={toggleModal}
                >
                    No
                </button>
            </div>
        </>
    )
}

