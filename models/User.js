const { Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt'); // encrypt passwords in database

const sequelize = require('../config/connection');

class User extends Model {
    // allow user to have all the methods to interact with database via Sequelize 
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async(newUserData) => {
                // newUserData = { id: 1, name: Lauren, email: lgenzone@icloud.com, password: SuperSafePassword }
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false, // won't create creationDate, lastUpdateDate
        modelName: 'user',
        freezeTableName: true, // won't make table names plural
    }
);

module.exports = User;