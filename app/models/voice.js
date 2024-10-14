import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Voice extends Model {}

Voice.init({
  voice_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  voice_title: {
    type: DataTypes.STRING,
    allowNull: false,
  }},
{
  sequelize,
  tableName:"voice"
    
});

