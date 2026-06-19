import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ValidateSchemaSignIn } from '../../schemas/signInSchema'
import { useSignInMutation } from '../../store/auth/authApi'
import type { ISignInForm } from '../../interfaces/inputData/inputData'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import Loader from '../Loader/Loader'
import Input from '../Input/Input'
import './SignInForm.scss'
import { zodResolver } from '@hookform/resolvers/zod'

export default function SignInForm() {
    const [loginUser, { isLoading }] = useSignInMutation()
    const navigation = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ISignInForm>({
        mode: 'onSubmit',
        resolver: zodResolver(ValidateSchemaSignIn)
    })

    async function onSubmit({ email, name, password }) {
        try {
            await loginUser({ email, name, password })

            navigation('/workout-list')
        } catch (e) {
            console.log(e)
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

