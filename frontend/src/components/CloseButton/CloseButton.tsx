import Close from '../../icons/Close/Close'
import type { CloseButtonProps } from '../../interfaces/props/shared/shared'
import './CloseButton.scss'

export default function CloseButton({ onClose }: CloseButtonProps) {
    return (
        <button className='close-button' onClick={onClose}>
            <Close />
        </button>
    )
}

