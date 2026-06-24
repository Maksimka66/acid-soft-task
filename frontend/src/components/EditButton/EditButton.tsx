import Edit from '../../icons/Edit/Edit'
import type { ActionButtonProps } from '../../interfaces/props/shared/shared'
import ModalWindow from '../ModalWindow/ModalWindow'
import './EditButton.scss'

export default function EditButton({ children, toggleModal, isOpen }: ActionButtonProps) {
    return (
        <>
            <button className='edit-button' onClick={() => toggleModal(true)}>
                <Edit />
            </button>
            <ModalWindow isOpen={isOpen} onClose={() => toggleModal(false)}>
                {children}
            </ModalWindow>
        </>
    )
}

