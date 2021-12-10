"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.user.hasMany(models.animal, {
                foreignKey: "userId",
                sourceKey: "id",
                onDelete: 'cascade'
            })
            models.user.hasMany(models.comment, {
                foreignKey: "comment_user_id",
                sourceKey: "user_id",
            })
            models.user.hasMany(models.post, {
                foreignKey: "user_id",
                sourceKey: "user_id",
            })
            models.user.hasMany(models.like, {
                foreignKey: "id",
                sourceKey: "user_id",
            })
        }
    }
    user.init(
        {
            user_id: DataTypes.STRING,
            password: DataTypes.STRING,
            nickname: DataTypes.STRING,
            profilePhoto: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "user",
            paranoid: false
        }
    )
    return user
}
