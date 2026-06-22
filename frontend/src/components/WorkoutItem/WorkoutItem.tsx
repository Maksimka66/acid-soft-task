import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Arrow from '../../icons/Arrow/Arrow'
import Calendar from '../../icons/Calendar/Calendar'
import Dumbbell from '../../icons/Dumbbell/Dumbbell'
import ConfirmDeleteWorkout from '../ConfirmDeleteWorkout/ConfirmDeleteWorkout'
import ChangeWorkoutForm from '../ChangeWorkoutForm/ChangeWorkoutForm'
import DeleteWorkoutButton from '../DeleteWorkoutButton/DeleteWorkoutButton'
import EditWorkoutButton from '../EditWorkoutButton/EditWorkoutButton'
import './WorkoutItem.scss'

export default function WorkoutItem({ workoutItem }) {
    const [isOpenForEdit, setIsOpenForEdit] = useState(false)
    const [isOpenForDelete, setIsOpenForDelete] = useState(false)

    function toggleModalForEdit(toggle: boolean) {
        setIsOpenForEdit(toggle)
    }

    function toggleModalForDelete(toggle: boolean) {
        setIsOpenForDelete(toggle)
    }

    const { id, name, description, createdAt } = workoutItem

    return (
        <>
            <div className='item-icons-layout'>
                <div className='dumbbell'>
                    <Dumbbell />
                </div>
                <div className='item-icons-layout__action-container'>
                    <EditWorkoutButton isOpen={isOpenForEdit} toggleModal={toggleModalForEdit}>
                        <ChangeWorkoutForm id={id} toggleModal={() => toggleModalForEdit(false)} />
                    </EditWorkoutButton>
                    <DeleteWorkoutButton
                        isOpen={isOpenForDelete}
                        toggleModal={toggleModalForDelete}
                    >
                        <ConfirmDeleteWorkout
                            id={id}
                            toggleModal={() => toggleModalForDelete(false)}
                        />
                    </DeleteWorkoutButton>
                </div>
            </div>
            <p className='item-name'>{name}</p>
            <p className='item-description'>{description}</p>
            <div className='item-icons-layout__bottom-container'>
                <div className='date'>
                    <Calendar />
                    <span>{createdAt}</span>
                </div>
                <NavLink className='details-link' to={`/workout-details/${id}`}>
                    <Arrow />
                    Details
                </NavLink>
            </div>
        </>
    )
}

