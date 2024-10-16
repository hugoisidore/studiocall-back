import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class UserText extends Model {}

UserText.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }},
{
  sequelize,
  tableName:"user_text"
    
});
