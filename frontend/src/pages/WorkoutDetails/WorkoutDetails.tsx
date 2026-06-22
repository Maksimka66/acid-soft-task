import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentWorkout } from '../../store/workouts/workoutsSlice'
import { useLazyGetOneWorkoutQuery } from '../../store/workouts/workoutsApi'
import Header from '../../components/Header/Header'
import AddExerciseForm from '../../components/CreateExerciseForm/CreateExerciseForm'
import BackToPreviousPage from '../../components/BackToPreviousPage/BackToPreviousPage'
import EditWorkoutButton from '../../components/EditWorkoutButton/EditWorkoutButton'
import DeleteWorkoutButton from '../../components/DeleteWorkoutButton/DeleteWorkoutButton'
import ConfirmDeleteWorkout from '../../components/ConfirmDeleteWorkout/ConfirmDeleteWorkout'
import ChangeWorkoutForm from '../../components/ChangeWorkoutForm/ChangeWorkoutForm'
import Dumbbell from '../../icons/Dumbbell/Dumbbell'
import Loader from '../../components/Loader/Loader'
import Plus from '../../icons/Plus/Plus'
import Calendar from '../../icons/Calendar/Calendar'
import ExercisesList from '../../components/ExercisesList/ExercisesList'
import AddToHistoryButton from '../../components/AddToHistoryButton/AddToHistoryButton'
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import EmptyState from '../../components/EmptyState/EmptyState'
import { errorMessage } from '../../utils/toastMessage'
import './WorkoutDetails.scss'

export default function WorkoutDetails() {
    const [isOpenForExercise, setIsOpenForExercise] = useState(false)
    const [isOpenForEdit, setIsOpenForEdit] = useState(false)
    const [isOpenForDelete, setIsOpenForDelete] = useState(false)

    const { id } = useParams()

    const [getWorkout, { isLoading }] = useLazyGetOneWorkoutQuery()

    const currentWorkout = useSelector(selectCurrentWorkout)

    useEffect(() => {
        async function receiveWorkout() {
            try {
                await getWorkout(id)
            } catch (e) {
                console.log(e)

                errorMessage(e.data.message)
            }
        }

        receiveWorkout()
    }, [getWorkout, id])

    function toggleModalForExercise(toggle: boolean) {
        setIsOpenForExercise(toggle)
    }

    function toggleModalForEdit(toggle: boolean) {
        setIsOpenForEdit(toggle)
    }

    function toggleModalForDelete(toggle: boolean) {
        setIsOpenForDelete(toggle)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Header />
            {currentWorkout ? (
                <>
                    <div className='details'>
                        <BackToPreviousPage to='/workout-list'>Back to workouts</BackToPreviousPage>
                        <div className='details__main-info'>
                            <div className='details__first'>
                                <div className='details__dumbbell-container'>
                                    <Dumbbell />
                                </div>
                                <div className=''>
                                    <h2 className='details__workout-name'>{currentWorkout.name}</h2>
                                    <div className='details__created-date-layout'>
                                        <Calendar />
                                        <span className='details__created-date'>
                                            {currentWorkout.createdAt}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='details__second'>
                                <EditWorkoutButton
                                    isOpen={isOpenForEdit}
                                    toggleModal={toggleModalForEdit}
                                >
                                    <ChangeWorkoutForm
                                        id={id}
                                        toggleModal={() => toggleModalForEdit(false)}
                                    />
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
                        <div className='details__description-layout'>
                            <h3 className='details__description-title'>Description</h3>
                            <p className='details__description-text'>
                                {currentWorkout.description}
                            </p>
                        </div>
                        <div className='details__exercises'>
                            <div className='details__exercises-main'>
                                <h3 className='details__exercises-title'>Exercises</h3>
                                <button
                                    onClick={() => toggleModalForExercise(true)}
                                    className='details__exercises-add'
                                >
                                    <Plus />
                                    Add exercise
                                </button>
                            </div>
                            <ExercisesList exercises={currentWorkout.exercises} />
                        </div>
                        {currentWorkout && <AddToHistoryButton id={id} />}
                    </div>
                    <ModalWindow
                        isOpen={isOpenForExercise}
                        onClose={() => toggleModalForExercise(false)}
                    >
                        <AddExerciseForm workoutId={id} />
                    </ModalWindow>
                </>
            ) : (
                <EmptyState>No such workout</EmptyState>
            )}
        </>
    )
}

