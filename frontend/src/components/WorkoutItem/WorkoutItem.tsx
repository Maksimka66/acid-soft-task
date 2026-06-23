import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Arrow from '../../icons/Arrow/Arrow'
import Calendar from '../../icons/Calendar/Calendar'
import Dumbbell from '../../icons/Dumbbell/Dumbbell'
import ConfirmDeleteWorkout from '../ConfirmDeleteWorkout/ConfirmDeleteWorkout'
import ChangeWorkoutForm from '../ChangeWorkoutForm/ChangeWorkoutForm'
import DeleteButton from '../DeleteButton/DeleteButton'
import EditButton from '../EditButton/EditButton'
import { formatDate } from '../../utils/formatDate'
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

    const { id, name, description, createdAt, updatedAt } = workoutItem

    const formattedCreateDate = formatDate(createdAt)
    const formattedUpdatedDate = formatDate(updatedAt)

    return (
        <>
            <div className='item-icons-layout'>
                <div className='dumbbell'>
                    <Dumbbell />
                </div>
                <div className='item-icons-layout__action-container'>
                    <EditButton isOpen={isOpenForEdit} toggleModal={toggleModalForEdit}>
                        <ChangeWorkoutForm
                            id={id}
                            onClose={() => toggleModalForEdit(false)}
                            isOpen={isOpenForEdit}
                        />
                    </EditButton>
                    <DeleteButton isOpen={isOpenForDelete} toggleModal={toggleModalForDelete}>
                        <ConfirmDeleteWorkout
                            id={id}
                            toggleModal={() => toggleModalForDelete(false)}
                        />
                    </DeleteButton>
                </div>
            </div>
            <div className='item-icons-layout__bottom-container'>
                <p className='item-name'>{name}</p>
                {description && <p className='item-description'>{description}</p>}
                <div className='item-icons-layout__date-layout'>
                    <div className='date'>
                        <Calendar />
                        <div className='date__values'>
                            <span>Created: {formattedCreateDate}</span>
                            <span>Updated: {formattedUpdatedDate}</span>
                        </div>
                    </div>
                    <NavLink className='details-link' to={`/workout-details/${id}`}>
                        <Arrow />
                        Details
                    </NavLink>
                </div>
            </div>
        </>
    )
}

