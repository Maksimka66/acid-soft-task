import Search from '../../icons/Search/Search'
import type { SearchWorkoutProps } from '../../interfaces/props/shared/shared'
import './SearchWorkout.scss'

export default function SearchWorkout({ onChange }: SearchWorkoutProps) {
    return (
        <>
            <div className='search-layout'>
                <Search />
                <input
                    className='search-layout__field'
                    type='text'
                    placeholder='Search workouts...'
                    onChange={onChange}
                />
            </div>
        </>
    )
}

