import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class GuidedProduct extends Model {}

GuidedProduct.init({
  guided_product_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  guided_product_description: {
    type: DataTypes.TEXT,
  },
  guided_product_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  guided_product_image: {
    type: DataTypes.TEXT,  
  }},
{
  sequelize,
  tableName:"guided_product"
    
});

export default GuidedProduct; 

