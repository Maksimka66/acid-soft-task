import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateWorkoutMutation } from '../../store/workouts/workoutsApi'
import Input from '../Input/Input'
import Loader from '../Loader/Loader'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import { ValidateSchemaCreateWorkout } from '../../schemas/createWorkoutSchema'
import type { ICreateWorkout } from '../../interfaces/inputData/inputData'
import { errorMessage, successMessage } from '../../utils/toastMessage'

export default function CreateWorkoutForm() {
    const navigation = useNavigate()

    const [createWorkout, { isLoading }] = useCreateWorkoutMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ICreateWorkout>({
        mode: 'onSubmit',
        resolver: zodResolver(ValidateSchemaCreateWorkout)
    })

    async function onSubmit({ name, description }: ICreateWorkout) {
        try {
            const { data } = await createWorkout({ name, description }).unwrap()

            reset()

            successMessage('You`ve created a new workout!')

            navigation(`/workout-details/${data.id}`)
        } catch (e) {
            console.log(e)

            errorMessage(e.data.message)
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <form className='create-workout' onSubmit={handleSubmit(onSubmit)}>
            <div className='create-workout__container'>
                <Input
                    id='name'
                    type='text'
                    placeholder='Enter a workout name'
                    label='Workout name'
                    register={register('name')}
                    error={errors.name?.message}
                />
                <div className='create-workout__description-layout'>
                    <label htmlFor='description' className='create-workout__description-label'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        className='create-workout__description'
                        placeholder='Add a description (optional)'
                        {...register('description')}
                    />
                </div>
            </div>
            <SubmitFormButton>Create a workout</SubmitFormButton>
        </form>
    )
}

