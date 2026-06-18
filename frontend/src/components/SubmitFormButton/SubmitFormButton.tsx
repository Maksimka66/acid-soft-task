import './SubmitFormButton.scss'

export default function SubmitFormButton({ children }) {
    return (
        <button className='submit-btn' type='submit'>
            {children}
        </button>
    )
}

