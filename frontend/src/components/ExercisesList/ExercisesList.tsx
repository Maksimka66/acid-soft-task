import { useSelector } from 'react-redux'
import EmptyState from '../EmptyState/EmptyState'
import ExercisesItem from '../ExercisesItem/ExercisesItem'
import { selectExercises } from '../../store/workouts/workoutsSlice'
import './ExercisesList.scss'

export default function ExercisesList() {
    const exercises = useSelector(selectExercises)

    if (!exercises || !exercises.length) {
        return <EmptyState>No exercises</EmptyState>
    }

    return (
        <ul className='exercises-list'>
            {exercises.map((exercise) => (
                <li key={exercise.id} className='exercises-list__item'>
                    <ExercisesItem exerciseItem={exercise} />
                </li>
            ))}
        </ul>
    )
}

