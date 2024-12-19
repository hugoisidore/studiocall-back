import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Password extends Model {}

Password.init({
  password_title: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  password_text: {
    type: DataTypes.TEXT,
    allowNull: true,
  }},
{
  sequelize,
  tableName:"password"
    
});

export default Password; 

