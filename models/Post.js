const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {

}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true, // snake_case
        timestamps: true,
        modelName: 'post'
    }
);

module.exports = Post;