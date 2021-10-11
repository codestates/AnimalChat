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

      user.hasMany(models.animal, {
        foreignKey: "userId",
      })
      user.hasMany(models.comment, {
        foreignKey: "id",
      })
      user.hasMany(models.post_user, {
        foreignKey: "post_id",
      })
    }
  }
  user.init(
    {
      user_id: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  )
  return user
}
