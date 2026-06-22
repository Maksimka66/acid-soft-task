import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectWorkouts } from '../../store/workouts/workoutsSlice'
import Loader from '../../components/Loader/Loader'
import { useLazyGetAllWorkoutsQuery } from '../../store/workouts/workoutsApi'
import Header from '../../components/Header/Header'
import AddWorkoutButton from '../../components/AddWorkoutButton/AddWorkoutButton'
import CreateWorkoutForm from '../../components/CreateWorkoutForm/CreateWorkoutForm'
import WorkoutItem from '../../components/WorkoutItem/WorkoutItem'
import SearchWorkout from '../../components/SearchWorkout/SearchWorkout'
import EmptyState from '../../components/EmptyState/EmptyState'
import { errorMessage } from '../../utils/toastMessage'
import './WorkoutList.scss'

export default function WorkoutList() {
    const [isOpen, setIsOpen] = useState(false)

    const [getAllWorkouts, { isLoading }] = useLazyGetAllWorkoutsQuery()

    const workoutList = useSelector(selectWorkouts)

    useEffect(() => {
        async function receiveWorkouts() {
            try {
                await getAllWorkouts({})
            } catch (e) {
                console.log(e)

                errorMessage(e.data.message)
            }
        }

        receiveWorkouts()
    }, [getAllWorkouts])

    function toggleModal(toggle: boolean) {
        setIsOpen(toggle)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Header />
            <div className='workout-page'>
                <div className='workout-page__top-container'>
                    <h2 className=''></h2>
                    <AddWorkoutButton openModal={() => toggleModal(true)} />
                </div>
                <SearchWorkout />
                {workoutList && workoutList.length ? (
                    <ul className='workout-page__list'>
                        {workoutList.map((workoutItem) => (
                            <li key={workoutItem.id} className='workout-page__item'>
                                <WorkoutItem workoutItem={workoutItem} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <EmptyState>You don't have any workouts for now</EmptyState>
                )}
            </div>
            <CreateWorkoutForm isOpen={isOpen} onClose={() => toggleModal(false)} />
        </>
    )
}

