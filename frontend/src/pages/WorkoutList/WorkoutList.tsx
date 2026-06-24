import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import {
    filterWorkouts,
    selectTotalPages,
    selectWorkouts
} from '../../store/workouts/workoutsSlice'
import Loader from '../../components/Loader/Loader'
import { useLazyGetAllWorkoutsQuery } from '../../store/workouts/workoutsApi'
import Header from '../../components/Header/Header'
import AddWorkoutButton from '../../components/AddWorkoutButton/AddWorkoutButton'
import CreateWorkoutForm from '../../components/CreateWorkoutForm/CreateWorkoutForm'
import WorkoutItem from '../../components/WorkoutItem/WorkoutItem'
import Pagination from '../../components/Pagination/Pagination'
import FilteredWorkoutList from '../../components/FilteredWorkoutList/FilteredWorkoutList'
import SearchWorkout from '../../components/SearchWorkout/SearchWorkout'
import EmptyState from '../../components/EmptyState/EmptyState'
import { errorMessage } from '../../utils/toastMessage'
import { isApiError } from '../../utils/isApiError'
import type { Workout } from '../../interfaces/state/workouts'
import './WorkoutList.scss'

export default function WorkoutList() {
    const [text, setText] = useState('')
    const [filterText] = useDebounce(text, 1500)
    const [page, setPage] = useState(1)
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()

    const [getAllWorkouts, { isLoading }] = useLazyGetAllWorkoutsQuery()

    const workoutList = useSelector(selectWorkouts)
    const totalPages = useSelector(selectTotalPages)

    useEffect(() => {
        async function receiveWorkouts() {
            try {
                await getAllWorkouts({ page, limit: 8 }).unwrap()
            } catch (e) {
                if (isApiError(e)) {
                    errorMessage(e.data.message)
                }
            }
        }

        receiveWorkouts()
    }, [getAllWorkouts, page, totalPages])

    useEffect(() => {
        dispatch(filterWorkouts(filterText))
    }, [filterText, dispatch])

    function previousPage() {
        setPage(page - 1)
    }

    function nextPage() {
        setPage(page + 1)
    }

    function toggleModal(toggle: boolean) {
        setIsOpen(toggle)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Header />
            <div className='workout-page'>
                <div className='workout-page__top-container'>
                    <h2 className=''></h2>
                    <AddWorkoutButton openModal={() => toggleModal(true)} />
                </div>
                <SearchWorkout onChange={(e) => setText(e.target.value)} />

                {filterText ? (
                    <FilteredWorkoutList />
                ) : workoutList.length ? (
                    <>
                        <ul className='workout-page__list'>
                            {workoutList.map((workoutItem: Workout) => (
                                <li key={workoutItem.id} className='workout-page__item'>
                                    <WorkoutItem workoutItem={workoutItem} />
                                </li>
                            ))}
                        </ul>
                        <Pagination
                            handlePrevious={previousPage}
                            handleNext={nextPage}
                            page={page}
                            disabledPrevious={page === 1}
                            disabledNext={page > totalPages}
                        />
                    </>
                ) : (
                    <EmptyState>You don't have any workouts for now</EmptyState>
                )}
            </div>
            <CreateWorkoutForm isOpen={isOpen} onClose={() => toggleModal(false)} />
        </>
    )
}

