import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Text extends Model {}

Text.init({
  text_category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  template_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  }},
{
  sequelize,
  tableName:"text"
    
});

