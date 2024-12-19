import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class UserVoice extends Model {}

UserVoice.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  voice_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }},
{
  sequelize,
  tableName:"user_voice"
    
});
