import Exercise from '../../icons/Exercise/Exercise'
import './ExercisesItem.scss'

export default function ExercisesItem({ exercise }) {
    return (
        <>
            <div className='exercise-icon'>
                <Exercise />
            </div>
            <div>
                <span className=''>{exercise.name}</span>
                <ul className=''>
                    <li className=''>
                        <span>{exercise.sets}</span>
                    </li>
                    <li className=''>
                        <span>{exercise.rets}</span>
                    </li>
                    <li className=''>
                        <span>{exercise.weight}</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

