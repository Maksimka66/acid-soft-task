import Delete from '../../icons/Delete/Delete'
import type { ActionButtonProps } from '../../interfaces/props/shared/shared'
import ModalWindow from '../ModalWindow/ModalWindow'
import './DeleteButton.scss'

export default function DeleteButton({ children, toggleModal, isOpen }: ActionButtonProps) {
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

