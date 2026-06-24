import LeftArrow from '../../icons/LeftArrow/LeftArrow'
import RightArrow from '../../icons/RightArrow/RightArrow'
import type { PaginationProps } from '../../interfaces/props/shared/shared'
import './Pagination.scss'

export default function Pagination({
    handlePrevious,
    handleNext,
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

