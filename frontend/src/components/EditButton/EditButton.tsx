import Edit from '../../icons/Edit/Edit'
import ModalWindow from '../ModalWindow/ModalWindow'
import './EditButton.scss'

export default function EditButton({ children, toggleModal, isOpen }) {
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

