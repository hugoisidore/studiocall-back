import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class UserMusic extends Model {}

UserMusic.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  music_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }},
{
  sequelize,
  tableName:"user_music"
    
});
