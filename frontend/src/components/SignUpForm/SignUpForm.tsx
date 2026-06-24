import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ValidateSchemaSignUp } from '../../schemas/signUpSchema'
import type { ISignUpForm } from '../../interfaces/inputData/inputData'
import { useSignUpMutation } from '../../store/auth/authApi'
import Input from '../Input/Input'
import Loader from '../Loader/Loader'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import { errorMessage, successMessage } from '../../utils/toastMessage'
import { isApiError } from '../../utils/isApiError'
import './SignUpForm.scss'

export default function SignUpForm() {
    const [registerUser, { isLoading }] = useSignUpMutation()
    const navigation = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ISignUpForm>({
        mode: 'onSubmit',
        resolver: zodResolver(ValidateSchemaSignUp)
    })

    async function onSubmit({ email, username, password }: ISignUpForm) {
        try {
            await registerUser({ email, username, password }).unwrap()

            successMessage('Successful registration!')

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
            <h2 className='form__title'>Create account</h2>
            <p className='form__text'>Start tracking your workouts today</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form__container'>
                    <Input
                        id='username'
                        type='text'
                        placeholder='Enter username'
                        label='Username'
                        error={errors.username?.message}
                        register={register('username')}
                    />
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
                        placeholder='Enter password'
                        label='Password'
                        register={register('password')}
                        error={errors.password?.message}
                    />
                    <Input
                        id='confirmPassword'
                        type='password'
                        placeholder='Confirm password'
                        label='Confirm password'
                        register={register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                    />
                </div>
                <SubmitFormButton>Sign Up</SubmitFormButton>
            </form>
        </div>
    )
}

