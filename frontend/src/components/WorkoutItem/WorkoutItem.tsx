import { NavLink } from 'react-router-dom'
import Arrow from '../../icons/Arrow/Arrow'
import Calendar from '../../icons/Calendar/Calendar'
import Delete from '../../icons/Delete/Delete'
import Dumbbell from '../../icons/Dumbbell/Dumbbell'
import Edit from '../../icons/Edit/Edit'
import './WorkoutItem.scss'

export default function WorkoutItem({ workoutItem }) {
    const { id, name, description, createdAt } = workoutItem

    return (
        <>
            <div className='item-icons-layout'>
                <div className='dumbbell'>
                    <Dumbbell />
                </div>
                <div className='item-icons-layout__action-container'>
                    <button className='item-icons-layout__action'>
                        <Edit />
                    </button>
                    <button className='item-icons-layout__action'>
                        <Delete />
                    </button>
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

