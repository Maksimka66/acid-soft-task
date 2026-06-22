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
import ModalWindow from '../ModalWindow/ModalWindow'

export default function CreateExerciseForm({ id, isOpen, onClose }) {
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

    async function onSubmit({ name, sets, reps, weight }: ICreateExercise) {
        try {
            await createExercise({ id, name, sets, reps, weight }).unwrap()

            onClose()

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
        <ModalWindow isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='create-exercise__container'>
                    <Input
                        id='name'
                        type='text'
                        placeholder='Exercise name'
                        label='Name'
                        register={register('name')}
                        error={errors.name?.message}
                    />
                    <Input
                        id='sets'
                        type='number'
                        placeholder='Number of sets'
                        label='Sets'
                        register={register('sets', { valueAsNumber: true })}
                        error={errors.sets?.message}
                    />
                    <Input
                        id='reps'
                        type='number'
                        placeholder='Number of reps'
                        label='Reps'
                        register={register('reps', { valueAsNumber: true })}
                        error={errors.reps?.message}
                    />
                    <Input
                        id='weight'
                        type='number'
                        placeholder='Weight (kg)'
                        label='Weight'
                        register={register('weight', { valueAsNumber: true })}
                        error={errors.weight?.message}
                        step={0.1}
                    />
                </div>
                <SubmitFormButton>Create a exercise</SubmitFormButton>
            </form>
        </ModalWindow>
    )
}

