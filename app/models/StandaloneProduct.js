import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class StandaloneProduct extends Model {}

StandaloneProduct.init({
  standalone_product_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  standalone_product_description: {
    type: DataTypes.TEXT,
  },
  standalone_product_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  standalone_product_image: {
    type: DataTypes.TEXT,  
  }},
{
  sequelize,
  tableName:"standalone_product"
    
});

export default StandaloneProduct; 

