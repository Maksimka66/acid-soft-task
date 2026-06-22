import Header from '../../components/Header/Header'
import HistoryList from '../../components/HistoryList/HistoryList'
import './WorkoutHistory.scss'

export default function WorkoutHistory() {
    return (
        <>
            <Header />
            <div className='workout-history'>
                <h2 className='workout-history__title'>Workout history</h2>
                <p className='workout-history__text'>Track your completed workouts over time</p>
                <HistoryList />
            </div>
        </>
    )
}

