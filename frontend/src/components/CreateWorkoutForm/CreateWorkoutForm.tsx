import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateWorkoutMutation } from '../../store/workouts/workoutsApi'
import Input from '../Input/Input'
import Loader from '../Loader/Loader'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import { ValidateSchemaCreateWorkout } from '../../schemas/createWorkoutSchema'
import type { ICreateWorkout } from '../../interfaces/inputData/inputData'
import './CreateWorkoutForm.scss'

export default function CreateWorkoutForm() {
    const navigation = useNavigate()

    const [createWorkout, { isLoading }] = useCreateWorkoutMutation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ICreateWorkout>({
        mode: 'onSubmit',
        resolver: zodResolver(ValidateSchemaCreateWorkout)
    })

    async function onSubmit({ name, description }: ICreateWorkout) {
        try {
            const { data } = await createWorkout({ name, description })

            if (data) {
                console.log(data.id)

                navigation(`/workout-details/${data.id}`)
            }
        } catch (e) {
            console.log(e)
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
                <Input
                    id='description'
                    type='text'
                    placeholder='Add some info'
                    label='Description'
                    register={register('description')}
                    error={errors.description?.message}
                />
            </div>
            <SubmitFormButton>Create a workout</SubmitFormButton>
        </form>
    )
}

