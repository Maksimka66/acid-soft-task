import { DataTypes } from 'sequelize'
import sequelize from '../../core/sequelize.js'

export const Workout = sequelize.define('workout', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: 'No description'
    }
})

