import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyGetOneWorkoutQuery } from '../../store/workouts/workoutsApi'
import AddExerciseForm from '../../components/CreateExerciseForm/CreateExerciseForm'
import BackToPreviousPage from '../../components/BackToPreviousPage/BackToPreviousPage'
import Dumbbell from '../../icons/Dumbbell/Dumbbell'
import Loader from '../../components/Loader/Loader'
import Delete from '../../icons/Delete/Delete'
import Edit from '../../icons/Edit/Edit'
import Plus from '../../icons/Plus/Plus'
import ExercisesList from '../../components/ExercisesList/ExercisesList'
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import './WorkoutDetails.scss'

export default function WorkoutDetails() {
    const [isOpen, setIsOpen] = useState(false)

    const { id } = useParams()

    const [getWorkout, { data: workout, isLoading }] = useLazyGetOneWorkoutQuery()

    useEffect(() => {
        getWorkout(id)
    }, [getWorkout, id])

    function toggleModal(toggle: boolean) {
        setIsOpen(toggle)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            {workout ? (
                <>
                    <div className='details'>
                        <BackToPreviousPage to='/workout-list'>Back to workouts</BackToPreviousPage>
                        <div className='details__main-info'>
                            <div className='details__first'>
                                <div className=''>
                                    <Dumbbell />
                                </div>
                                <div className=''>
                                    <h2 className=''>{workout.name}</h2>
                                    <p className='created-date'>{workout.createdAt}</p>
                                </div>
                            </div>
                            <div className='details__second'>
                                <button className='details__action'>
                                    <Edit />
                                </button>
                                <button className='details__action'>
                                    <Delete />
                                </button>
                            </div>
                        </div>
                        <div className='details__description-layout'>
                            <h3 className='details__description-title'>Description</h3>
                            <p className='details__description-text'>{workout.description}</p>
                        </div>
                        <div className='details__exercises'>
                            <div className='details__exercises-main'>
                                <h3 className='details__exercises-title'>Exercises</h3>
                                <button
                                    onClick={() => toggleModal(true)}
                                    className='details__exercises-add'
                                >
                                    <Plus />
                                    Add exercise
                                </button>
                            </div>
                            <ExercisesList exercises={workout.exercises} />
                        </div>
                    </div>
                    <ModalWindow isOpen={isOpen} onClose={() => toggleModal(false)}>
                        <AddExerciseForm workoutId={id} />
                    </ModalWindow>
                </>
            ) : (
                <div>Empty</div>
            )}
        </>
    )
}

