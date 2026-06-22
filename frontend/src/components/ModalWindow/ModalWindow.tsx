import Modal from 'react-modal'
import CloseButton from '../CloseButton/CloseButton'
import './ModalWindow.scss'

export default function ModalWindow({ isOpen, onClose, children }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            closeTimeoutMS={400}
            overlayClassName={{
                base: 'modal-overlay',
                afterOpen: 'modal-overlay--after-open',
                beforeClose: 'modal-overlay--before-close'
            }}
            className={{
                base: 'modal-overlay__content',
                afterOpen: 'modal-overlay__content--after-open',
                beforeClose: 'modal-overlay__content--before-close'
            }}
        >
            <CloseButton onClose={onClose} />
            {children}
        </Modal>
    )
}

