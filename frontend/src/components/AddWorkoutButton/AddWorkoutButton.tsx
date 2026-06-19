import Plus from '../../icons/Plus/Plus'
import './AddWorkoutButton.scss'

export default function AddWorkoutButton({ openModal }) {
    return (
        <button className='add-workout' onClick={openModal}>
            <Plus />
            New workout
        </button>
    )
}

