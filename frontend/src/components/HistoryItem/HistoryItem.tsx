import Check from '../../icons/Check/Check'

export default function HistoryItem({ historyItem }) {
    const date = new Date(historyItem.completedAt)

    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <div className='history-item'>
            <div className='history-item__icon'>
                <Check />
            </div>
            <div className='history-item__info'>
                <p className='history-item__name'>{historyItem.name}</p>
                <p className='history-item__date'>{formattedDate}</p>
            </div>
            <span className='history-item__time'>{formattedTime}</span>
        </div>
    )
}

