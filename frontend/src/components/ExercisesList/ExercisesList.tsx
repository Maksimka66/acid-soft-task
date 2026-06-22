import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLazyGetOneWorkoutQuery } from '../../store/workouts/workoutsApi'
import EmptyState from '../EmptyState/EmptyState'
import ExercisesItem from '../ExercisesItem/ExercisesItem'
import Loader from '../Loader/Loader'
import { selectCurrentWorkout } from '../../store/workouts/workoutsSlice'
import { errorMessage } from '../../utils/toastMessage'
import './ExercisesList.scss'

export default function ExercisesList({ id }) {
    const [getWorkout, { isLoading }] = useLazyGetOneWorkoutQuery()

    const { exercises } = useSelector(selectCurrentWorkout)

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
    }, [getWorkout, id, exercises])

    if (!exercises || !exercises.length) {
        return <EmptyState>No exercises</EmptyState>
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <ul className='exercises-list'>
            {exercises.map((exercise) => (
                <li key={exercise.id} className='exercises-list__item'>
                    <ExercisesItem exercise={exercise} />
                </li>
            ))}
        </ul>
    )
}

