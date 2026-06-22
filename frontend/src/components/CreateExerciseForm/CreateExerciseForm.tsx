import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddExerciseMutation } from '../../store/workouts/workoutsApi'
import type { ICreateExercise } from '../../interfaces/inputData/inputData'
import { ValidateSchemaCreateExercise } from '../../schemas/createExerciseSchema'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import Input from '../Input/Input'
import Loader from '../Loader/Loader'
import { errorMessage, successMessage } from '../../utils/toastMessage'
import './CreateExerciseForm.scss'

export default function CreateExerciseForm({ workoutId }) {
    const [createExercise, { isLoading }] = useAddExerciseMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ICreateExercise>({
        mode: 'onSubmit',
        resolver: zodResolver(ValidateSchemaCreateExercise)
    })

    async function onSubmit(inputData: ICreateExercise) {
        try {
            await createExercise({ workoutId, ...inputData }).unwrap()

            successMessage('New exercise created!')

            reset()
        } catch (e) {
            console.log(e)

            errorMessage(e.data.message)
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    type='text'
                    placeholder='Add your sets'
                    label='Sets'
                    register={register('sets')}
                    error={errors.sets?.message}
                />
                <Input
                    id='reps'
                    type='text'
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
            <SubmitFormButton>Create a exercise</SubmitFormButton>
        </form>
    )
}

