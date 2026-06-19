import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ICreateExercise } from '../../interfaces/inputData/inputData'
import { ValidateSchemaCreateExercise } from '../../schemas/createExerciseSchema'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import Input from '../Input/Input'
import Loader from '../Loader/Loader'
import './CreateExerciseForm.scss'

export default function CreateExerciseForm({ workoutId }) {
    const [createExercise, { isLoading }] = useCreateWorkoutMutation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ICreateExercise>({
        mode: 'onSubmit',
        resolver: zodResolver(ValidateSchemaCreateExercise)
    })

    async function onSubmit(inputData: ICreateExercise) {
        try {
            await createExercise({ workoutId, ...inputData })
        } catch (e) {
            console.log(e)
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <form className='' onSubmit={handleSubmit(onSubmit)}>
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
                    id='sets'
                    type='number'
                    placeholder='Add your sets'
                    label='Sets'
                    register={register('sets')}
                    error={errors.sets?.message}
                />
                <Input
                    id='reps'
                    type='number'
                    placeholder='Add your reps'
                    label='Reps'
                    register={register('reps')}
                    error={errors.reps?.message}
                />
                <Input
                    id='weight'
                    type='text'
                    placeholder='Add your weight'
                    label='Weight'
                    register={register('reps')}
                    error={errors.weight?.message}
                />
            </div>
            <SubmitFormButton>Create a workout</SubmitFormButton>
        </form>
    )
}

