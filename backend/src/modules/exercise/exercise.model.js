import { DataTypes } from 'sequelize'
import sequelize from '../../core/sequelize.js'

export const Exercise = sequelize.define('exercise', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    sets: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    reps: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    weight: {
        type: DataTypes.DECIMAL(5, 2)
    }
})

