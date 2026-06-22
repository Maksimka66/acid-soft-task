import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SubmitFormButton from '../SubmitFormButton/SubmitFormButton'
import Input from '../Input/Input'
import Loader from '../Loader/Loader'
import { useUpdateWorkoutMutation } from '../../store/workouts/workoutsApi'
import type { IUpdateWorkout } from '../../interfaces/inputData/inputData'
import { ValidateSchemaUpdateWorkout } from '../../schemas/updateWorkoutSchema'
import { errorMessage, successMessage } from '../../utils/toastMessage'
import './ChangeWorkoutForm.scss'
import ModalWindow from '../ModalWindow/ModalWindow'

export default function ChangeWorkoutForm({ id, isOpen, onClose }) {
    const [updateWorkout, { isLoading }] = useUpdateWorkoutMutation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IUpdateWorkout>({
        mode: 'onSubmit',
        resolver: zodResolver(ValidateSchemaUpdateWorkout)
    })

    async function onSubmit({ name, description }: IUpdateWorkout) {
        try {
            await updateWorkout({ id, name, description }).unwrap()

            onClose()

            successMessage('Successful updated workout!')
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
                <SubmitFormButton>Update the workout</SubmitFormButton>
            </form>
        </ModalWindow>
    )
}

