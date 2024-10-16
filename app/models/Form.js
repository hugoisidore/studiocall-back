import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Form extends Model {}

Form.init({
    interlocutor_name:{
        type:DataTypes.TEXT,
        allowNull: false,
    },
    company_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    company_postal_adress: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    installer_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    studiocall_interlocutor: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    file_reference: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }},
{
    sequelize,
    tableName:"form"
      
});

