import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class User extends Model {}

User.init({
    user_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true
    },
    user_role: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true
    },
    password_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
{
    sequelize,
    tableName:"user"

});

export default User;