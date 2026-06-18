import { DataTypes } from 'sequelize'
import sequelize from '../../core/sequelize.js'

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    }
})

