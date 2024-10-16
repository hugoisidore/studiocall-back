import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class User extends Model {}

User.init({
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    }},
{
    sequelize,
    tableName:"user"

});