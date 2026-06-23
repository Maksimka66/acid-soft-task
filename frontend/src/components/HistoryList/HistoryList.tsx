import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLazyGetFullHistoryQuery } from '../../store/history/historyApi'
import { selectHistory } from '../../store/history/historySlice'
import HistoryItem from '../HistoryItem/HistoryItem'
import Loader from '../Loader/Loader'
import EmptyState from '../EmptyState/EmptyState'
import { errorMessage } from '../../utils/toastMessage'
import './HistoryList.scss'

export default function HistoryList() {
    const [getHistory, { isLoading }] = useLazyGetFullHistoryQuery()

    const historyList = useSelector(selectHistory)

    useEffect(() => {
        async function receiveHistory() {
            try {
                await getHistory({})
            } catch (e) {
                console.log(e)

                errorMessage(e.data.message)
            }
        }

        receiveHistory()
    }, [getHistory])

    if (isLoading) {
        return <Loader />
    }

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

