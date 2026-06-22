import { useSelector } from 'react-redux'
import { selectFilteredWorkouts } from '../../store/workouts/workoutsSlice'
import WorkoutItem from '../WorkoutItem/WorkoutItem'
import EmptyState from '../EmptyState/EmptyState'
import './FilteredWorkoutList.scss'

export default function FilteredWorkoutList() {
    const filteredList = useSelector(selectFilteredWorkouts)

    return filteredList.length ? (
        <>
            <ul className='workout-page__list'>
                {filteredList.map((workoutItem) => (
                    <li key={workoutItem.id} className='workout-page__item'>
                        <WorkoutItem workoutItem={workoutItem} />
                    </li>
                ))}
            </ul>
        </>
    ) : (
        <EmptyState>No such workouts</EmptyState>
    )
}

