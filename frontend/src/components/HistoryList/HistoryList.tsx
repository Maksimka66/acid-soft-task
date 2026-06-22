import { useSelector } from 'react-redux'
import { selectHistory } from '../../store/history/historySlice'
import HistoryItem from '../HistoryItem/HistoryItem'
import EmptyState from '../EmptyState/EmptyState'
import './HistoryList.scss'

export default function HistoryList() {
    const historyList = useSelector(selectHistory)

    if (!historyList || !historyList.length) {
        return <EmptyState>Your history is empty!</EmptyState>
    }

    return (
        <ul className='history-workout'>
            {historyList.map((historyItem) => (
                <li key={historyItem.id}>
                    <HistoryItem historyItem={historyItem} />
                </li>
            ))}
        </ul>
    )
}

