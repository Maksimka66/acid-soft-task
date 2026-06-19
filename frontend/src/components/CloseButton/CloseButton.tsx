import Close from '../../icons/Close/Close'
import './CloseButton.scss'

export default function CloseButton({ onClose }) {
    return (
        <button className='close-button' onClick={onClose}>
            <Close />
        </button>
    )
}

