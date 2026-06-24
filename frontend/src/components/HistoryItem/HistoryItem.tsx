import Check from '../../icons/Check/Check'
import type { HistoryItemProps } from '../../interfaces/state/history'
import { formatDate } from '../../utils/formatDate'
import Loader from '../Loader/Loader'
import './HistoryItem.scss'

export default function HistoryItem({ historyItem }: HistoryItemProps) {
    const { createdAt, workout } = historyItem

    return (
        <div className='history-item'>
            <div className='history-item__icon'>
                <Check />
            </div>
            {workout ? (
                <>
                    <div className='history-item__info'>
                        <p className='history-item__name'>{workout.name}</p>
                        <p className='history-item__description'>{workout.description}</p>
                    </div>
                    <span className='history-item__time'>{formatDate(createdAt)}</span>
                </>
            ) : (
                <Loader />
            )}
        </div>
    )
}

