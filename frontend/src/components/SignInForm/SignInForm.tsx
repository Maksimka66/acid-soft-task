import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ValidateSchemaSignIn } from '../../schemas/signInSchema'
import { useSignInMutation } from '../../store/auth/authApi'
import type { ISignInForm } from '../../interfaces/inputData/inputData'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import Loader from '../Loader/Loader'
import Input from '../Input/Input'
import { errorMessage, successMessage } from '../../utils/toastMessage'
import { isApiError } from '../../utils/isApiError'
import './SignInForm.scss'

export default function SignInForm() {
    const [loginUser, { isLoading }] = useSignInMutation()
    const navigation = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ISignInForm>({
        mode: 'onSubmit',
        resolver: zodResolver(ValidateSchemaSignIn)
    })

    async function onSubmit({ email, password }: ISignInForm) {
        try {
            await loginUser({ email, password }).unwrap()

            successMessage('Successful login!')

            reset()

            navigation('/workout-list')
        } catch (e) {
            if (isApiError(e)) {
                errorMessage(e.data.message)
            }
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='form'>
            <h2 className='form__title'>Login account</h2>
            <p className='form__text'>Welcome back! Wanna continue?</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form__container'>
                    <Input
                        id='email'
                        type='email'
                        placeholder='your@email.com'
                        label='Email'
                        register={register('email')}
                        error={errors.email?.message}
                    />
                    <Input
                        id='password'
                        type='password'
                        placeholder='Password'
                        label='Password'
                        register={register('password')}
                        error={errors.password?.message}
                    />
                </div>
                <SubmitFormButton>Sign In</SubmitFormButton>
            </form>
        </div>
    )
}

