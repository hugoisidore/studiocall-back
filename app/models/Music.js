import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Music extends Model {}

Music.init({
  music_category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  music_title: {
    type: DataTypes.TEXT,
    allowNull: false,
  }},
{
  sequelize,
  tableName:"music"
    
});
