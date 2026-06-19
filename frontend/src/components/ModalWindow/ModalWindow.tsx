import Modal from 'react-modal'
import CloseButton from '../CloseButton/CloseButton'
import './ModalWindow.scss'

export default function ModalWindow({ isOpen, onClose, children }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName='modal-overlay'
            className='modal-overlay__content'
            // closeTimeoutMS={200}
        >
            <CloseButton onClose={onClose} />
            {children}
        </Modal>
    )
}

