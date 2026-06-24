import { useCompleteWorkoutMutation } from '../../store/workouts/workoutsApi'
import Loader from '../Loader/Loader'
import Check from '../../icons/Check/Check'
import { errorMessage, successMessage } from '../../utils/toastMessage'
import type { AddToHistoryButtonProps } from '../../interfaces/props/shared/shared'
import { isApiError } from '../../utils/isApiError'
import './AddToHistoryButton.scss'

export default function AddToHistoryButton({ id }: AddToHistoryButtonProps) {
    const [addToHistory, { isLoading }] = useCompleteWorkoutMutation()

    async function handleAddToHistory() {
        try {
            await addToHistory(id).unwrap()

            successMessage('Added to history')
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
        <button className='history-button' onClick={handleAddToHistory}>
            <Check />
            Mark as complete
        </button>
    )
}

