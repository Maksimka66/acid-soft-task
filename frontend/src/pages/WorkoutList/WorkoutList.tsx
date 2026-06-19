import { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import { useLazyGetAllWorkoutsQuery } from '../../store/workouts/workoutsApi'
import AddWorkoutButton from '../../components/AddWorkoutButton/AddWorkoutButton'
import CreateWorkoutForm from '../../components/CreateWorkoutForm/CreateWorkoutForm'
import WorkoutItem from '../../components/WorkoutItem/WorkoutItem'
import SearchWorkout from '../../components/SearchWorkout/SearchWorkout'
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import './WorkoutList.scss'

export default function WorkoutList() {
    const [isOpen, setIsOpen] = useState(false)

    const [getAllWorkouts, { data: workouts, isLoading }] = useLazyGetAllWorkoutsQuery()

    useEffect(() => {
        getAllWorkouts({})
    }, [getAllWorkouts])

    function toggleModal(toggle: boolean) {
        setIsOpen(toggle)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className='workout-page'>
                <div className='workout-page__top-container'>
                    <h2 className=''></h2>
                    <AddWorkoutButton openModal={() => toggleModal(true)} />
                </div>
                <SearchWorkout />
                {workouts && workouts.length ? (
                    <ul className='workout-page__list'>
                        {workouts.map((workoutItem) => (
                            <li key={workoutItem.id} className='workout-page__item'>
                                <WorkoutItem workoutItem={workoutItem} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>Empty</div>
                )}
            </div>
            <ModalWindow isOpen={isOpen} onClose={() => toggleModal(false)}>
                <CreateWorkoutForm />
            </ModalWindow>
        </>
    )
}

