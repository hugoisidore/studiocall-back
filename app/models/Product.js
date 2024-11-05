import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Product extends Model {}

Product.init({
  product_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  product_description: {
    type: DataTypes.TEXT,
  },
  product_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_image: {
    type: DataTypes.TEXT,  
  }},
{
  sequelize,
  tableName:"product"
    
});

export default Product; 

