import { User } from './user/user.model.js'
import { Exercise } from './exercise/exercise.model.js'
import { History } from './history/history.model.js'
import { Workout } from './workout/workout.model.js'

User.hasMany(Workout)
Workout.belongsTo(User)

Workout.hasMany(Exercise)
Exercise.belongsTo(Workout)

Workout.hasOne(History)
History.belongsTo(Workout)

