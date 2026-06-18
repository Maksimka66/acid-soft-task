import { DataTypes } from 'sequelize'
import sequelize from '../../core/sequelize.js'

export const History = sequelize.define('workout_history', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

