import Check from '../../icons/Check/Check'

export default function HistoryItem({ historyItem }) {
    // console.log(historyItem)

    return (
        <div className='history-item'>
            <div className='history-item__icon'>
                <Check />
            </div>
            <div className='history-item__info'>
                <p className='history-item__name'>{historyItem.name}</p>
                <p className='history-item__date'>{historyItem.createdAt}</p>
            </div>
            <span className='history-item__time'>{historyItem.createdAt}</span>
        </div>
    )
}

