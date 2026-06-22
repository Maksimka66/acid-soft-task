import { useState } from 'react'
import ModalWindow from '../ModalWindow/ModalWindow'
import ConfirmLogout from '../ConfirmLogout/ConfirmLogout'
import './LogoutButton.scss'

export default function LogoutButton() {
    const [isOpen, setIsOpen] = useState(false)

    function toggleModal(toggle: boolean) {
        setIsOpen(toggle)
    }

    return (
        <>
            <button className='logout-button' onClick={() => toggleModal(true)}>
                Logout
            </button>
            <ModalWindow isOpen={isOpen} onClose={() => toggleModal(false)}>
                <ConfirmLogout toggleModal={() => toggleModal(false)} />
            </ModalWindow>
        </>
    )
}

