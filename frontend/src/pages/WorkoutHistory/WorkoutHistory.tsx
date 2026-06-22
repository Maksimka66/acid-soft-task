import Header from '../../components/Header/Header'
import HistoryList from '../../components/HistoryList/HistoryList'
import './WorkoutHistory.scss'

export default function WorkoutHistory() {
    return (
        <div className='workout-history'>
            <Header />
            <HistoryList />
        </div>
    )
}

