import LeftArrow from '../../icons/LeftArrow/LeftArrow'
import RightArrow from '../../icons/RightArrow/RightArrow'
import type { PaginationProps } from '../../interfaces/props/shared/shared'
import './Pagination.scss'

export default function Pagination({
    handlePrevious,
    handleNext,
    page,
    disabledPrevious,
    disabledNext
}: PaginationProps) {
    return (
        <div className='pagination-layout'>
            <button
                className='pagination-layout__button'
                onClick={handlePrevious}
                disabled={disabledPrevious}
            >
                <LeftArrow />
            </button>
            <span className='pagination-layout__page'>Page {page}</span>
            <button
                className='pagination-layout__button'
                onClick={handleNext}
                disabled={disabledNext}
            >
                <RightArrow />
            </button>
        </div>
    )
}

