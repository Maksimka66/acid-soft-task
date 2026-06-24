import Plus from '../../icons/Plus/Plus'
import type { AddWorkoutButtonProps } from '../../interfaces/props/shared/shared'
import './AddWorkoutButton.scss'

export default function AddWorkoutButton({ openModal }: AddWorkoutButtonProps) {
    return (
        <button className='add-workout' onClick={openModal}>
            <Plus />
            New workout
        </button>
    )
}

