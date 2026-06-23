import Delete from '../../icons/Delete/Delete'
import ModalWindow from '../ModalWindow/ModalWindow'
import './DeleteButton.scss'

export default function DeleteButton({ children, toggleModal, isOpen }) {
    return (
        <>
            <button className='delete-button' onClick={() => toggleModal(true)}>
                <Delete />
            </button>
            <ModalWindow isOpen={isOpen} onClose={() => toggleModal(false)}>
                {children}
            </ModalWindow>
        </>
    )
}

