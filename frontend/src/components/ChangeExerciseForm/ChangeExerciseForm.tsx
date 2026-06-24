import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateExerciseMutation } from '../../store/workouts/workoutsApi'
import type { IUpdateExercise } from '../../interfaces/inputData/inputData'
import { ValidateSchemaCreateExercise } from '../../schemas/createExerciseSchema'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import Input from '../Input/Input'
import Loader from '../Loader/Loader'
import ModalWindow from '../ModalWindow/ModalWindow'
import { errorMessage, successMessage } from '../../utils/toastMessage'
import type { ChangeExerciseFormProps } from '../../interfaces/props/forms/forms'
import { isApiError } from '../../utils/isApiError'
import './ChangeExerciseForm.scss'

export default function ChangeExerciseForm({
    id,
    exerciseId,
    isOpen,
    onClose
}: ChangeExerciseFormProps) {
    const [createExercise, { isLoading }] = useUpdateExerciseMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IUpdateExercise>({
        mode: 'onSubmit',
        resolver: zodResolver(ValidateSchemaCreateExercise)
    })

    async function onSubmit({ name, sets, reps, weight }: IUpdateExercise) {
        try {
            await createExercise({ id, exerciseId, name, sets, reps, weight }).unwrap()

            onClose()

            successMessage('Exercise updated!')

            reset()
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
        <ModalWindow isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='update-exercise__container'>
                    <Input
                        id='name'
                        type='text'
                        placeholder='Exercise name'
                        label='Name'
                        register={register('name')}
                        error={errors.name?.message}
                        step={1}
                    />
                    <Input
                        id='sets'
                        type='number'
                        placeholder='Number of sets'
                        label='Sets'
                        register={register('sets', { valueAsNumber: true })}
                        error={errors.sets?.message}
                        step={1}
                    />
                    <Input
                        id='reps'
                        type='number'
                        placeholder='Number of reps'
                        label='Reps'
                        register={register('reps', { valueAsNumber: true })}
                        error={errors.reps?.message}
                        step={1}
                    />
                    <Input
                        id='weight'
                        type='number'
                        placeholder='Weight (kg)'
                        label='Weight'
                        register={register('weight', { valueAsNumber: true })}
                        error={errors.weight?.message}
                        step={0.01}
                    />
                </div>
                <SubmitFormButton>Update a exercise</SubmitFormButton>
            </form>
        </ModalWindow>
    )
}

