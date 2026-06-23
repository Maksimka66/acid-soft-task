import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChangeExerciseForm from '../ChangeExerciseForm/ChangeExerciseForm'
import Exercise from '../../icons/Exercise/Exercise'
import { formatDate } from '../../utils/formatDate'
import DeleteButton from '../DeleteButton/DeleteButton'
import EditButton from '../EditButton/EditButton'
import ConfirmDeleteExercise from '../ConfirmDeleteExercise/ConfirmDeleteExercise'
import './ExercisesItem.scss'

export default function ExercisesItem({ exerciseItem }) {
    const { name, sets, reps, weight, createdAt, updatedAt } = exerciseItem

    const { id } = useParams()

    const [isOpenForEdit, setIsOpenForEdit] = useState(false)
    const [isOpenForDelete, setIsOpenForDelete] = useState(false)

    function toggleModalForEdit(toggle: boolean) {
        setIsOpenForEdit(toggle)
    }

    function toggleModalForDelete(toggle: boolean) {
        setIsOpenForDelete(toggle)
    }

    const formattedCreateDate = formatDate(createdAt)
    const formattedUpdatedDate = formatDate(updatedAt)

    return (
        <>
            <div className='exercises'>
                <div className='exercises-icon'>
                    <Exercise />
                </div>
                <div className='exercises-layout'>
                    <h3 className='exercises-layout__name'>{name}</h3>
                    <ul className='exercises-items'>
                        <li className='exercises-items__item'>
                            <span>Sets: {sets}</span>
                        </li>
                        <li className='exercises-items__item'>
                            <span>Reps: {reps}</span>
                        </li>
                        <li className='exercises-items__item'>
                            <span>Weight: {weight}</span>
                        </li>
                    </ul>
                    <div className='exercises-layout__dates'>
                        <span>Created: {formattedCreateDate}</span>
                        <span>Updated: {formattedUpdatedDate}</span>
                    </div>
                </div>
            </div>
            <div className='exercises-actions'>
                <EditButton isOpen={isOpenForEdit} toggleModal={toggleModalForEdit}>
                    <ChangeExerciseForm
                        id={id}
                        exerciseId={exerciseItem.id}
                        onClose={() => toggleModalForEdit(false)}
                        isOpen={isOpenForEdit}
                    />
                </EditButton>
                <DeleteButton isOpen={isOpenForDelete} toggleModal={toggleModalForDelete}>
                    <ConfirmDeleteExercise
                        id={id}
                        exerciseId={exerciseItem.id}
                        toggleModal={() => toggleModalForDelete(false)}
                    />
                </DeleteButton>
            </div>
        </>
    )
}

