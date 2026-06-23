import { useDeleteExerciseMutation } from '../../store/workouts/workoutsApi'
import Loader from '../Loader/Loader'
import { errorMessage, successMessage } from '../../utils/toastMessage'

export default function ConfirmDeleteExercise({ id, exerciseId, toggleModal }) {
    const [removeExercise, { isLoading }] = useDeleteExerciseMutation()

    async function deleteWorkout() {
        try {
            await removeExercise({ id, exerciseId }).unwrap()

            toggleModal(false)

            successMessage('You`ve deleted this exercise!')
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
                    onClick={toggleModal}
                >
                    No
                </button>
            </div>
        </>
    )
}

