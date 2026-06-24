import { useNavigate } from 'react-router-dom'
import { useDeleteWorkoutMutation } from '../../store/workouts/workoutsApi'
import Loader from '../Loader/Loader'
import { errorMessage, successMessage } from '../../utils/toastMessage'
import type { ConfirmDeleteWorkoutProps } from '../../interfaces/props/shared/shared'
import { isApiError } from '../../utils/isApiError'
import './ConfirmDeleteWorkout.scss'

export default function ConfirmDeleteWorkout({ id, toggleModal }: ConfirmDeleteWorkoutProps) {
    const navigate = useNavigate()

    const [removeWorkout, { isLoading }] = useDeleteWorkoutMutation()

    async function deleteWorkout() {
        try {
            await removeWorkout(id).unwrap()

            toggleModal(false)

            successMessage('You`ve deleted this workout!')

            navigate('/workout-list')
        } catch (e) {
            if (isApiError(e)) {
                errorMessage(e.data.message)
            }
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <p className='text'>Are you sure you want to delete this workout?</p>
            <div className='buttons-container'>
                <button
                    className='buttons-container__button buttons-container__button--fulfill'
                    onClick={deleteWorkout}
                >
                    Yes
                </button>
                <button
                    className='buttons-container__button buttons-container__button--reject'
                    onClick={() => toggleModal(false)}
                >
                    No
                </button>
            </div>
        </>
    )
}

