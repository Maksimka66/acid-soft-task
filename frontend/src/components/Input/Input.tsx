import type { InputProps } from '../../interfaces/props/props'
import './Input.scss'

export default function Input(props: InputProps) {
    const { type, placeholder, label, error, register, id } = props

    return (
        <div className='field-layout'>
            <label className='field-layout__label' htmlFor={id}>
                {label}
            </label>
            <input
                className='field-layout__field'
                id={id}
                type={type}
                placeholder={placeholder}
                {...register}
            />
            {error && <span className='field-layout__error'>{error}</span>}
        </div>
    )
}

