import Search from '../../icons/Search/Search'
import './SearchWorkout.scss'

export default function SearchWorkout() {
    return (
        <div className='search-layout'>
            <Search />
            <input className='search-layout__field' type='text' placeholder='Search workouts...' />
        </div>
    )
}

