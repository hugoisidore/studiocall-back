import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Voice extends Model {}

Voice.init({
  voice_category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  voice_title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  file_voice: {
    type: DataTypes.TEXT,
    allowNull: false,
  }},
{
  sequelize,
  tableName:"voice"
    
});

