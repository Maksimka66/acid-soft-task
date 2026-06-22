import EmptyState from '../EmptyState/EmptyState'
import ExercisesItem from '../ExercisesItem/ExercisesItem'
import './ExercisesList.scss'

export default function ExercisesList({ exercises }) {
    if (!exercises || !exercises.length) {
        return <EmptyState>No exercises</EmptyState>
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

