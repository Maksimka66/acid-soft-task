import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { filterWorkouts } from '../../store/workouts/workoutsSlice'
import Search from '../../icons/Search/Search'
import './SearchWorkout.scss'

export default function SearchWorkout() {
    const [text, setText] = useState('')
    const [filterText] = useDebounce(text, 100)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(filterWorkouts(filterText))
    }, [filterText, dispatch])

    return (
        <div className='search-layout'>
            <Search />
            <input
                className='search-layout__field'
                type='text'
                placeholder='Search workouts...'
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    )
}

