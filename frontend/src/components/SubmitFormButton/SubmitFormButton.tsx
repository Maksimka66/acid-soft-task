import type { SubmitFormButtonProps } from '../../interfaces/props/shared/shared'
import './SubmitFormButton.scss'

export default function SubmitFormButton({ children }: SubmitFormButtonProps) {
    return (
        <button className='submit-btn' type='submit'>
            {children}
        </button>
    )
}

