import Delete from '../../icons/Delete/Delete'
import ModalWindow from '../ModalWindow/ModalWindow'
import './DeleteWorkoutButton.scss'

export default function DeleteWorkoutButton({ children, toggleModal, isOpen }) {
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

