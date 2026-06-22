import { useCompleteWorkoutMutation } from '../../store/workouts/workoutsApi'
import Loader from '../Loader/Loader'
import Check from '../../icons/Check/Check'
import { errorMessage, successMessage } from '../../utils/toastMessage'
import './AddToHistoryButton.scss'

export default function AddToHistoryButton({ id }) {
    const [addToHistory, { isLoading }] = useCompleteWorkoutMutation()

    async function handleAddToHistory() {
        try {
            await addToHistory(id).unwrap()

            successMessage('Added to history')
        } catch (e) {
            console.log(e)

            errorMessage(e.data.message)
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <button className='history-button' onClick={handleAddToHistory}>
            <Check />
            Mark as complete
        </button>
    )
}

