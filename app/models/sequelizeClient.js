import "dotenv/config";
import { Sequelize } from "sequelize";

console.log('PG_URL:', process.env.PG_URL); 

// Create a new instance of Sequelize
export const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  logging: false,
});

// Test the connection
await sequelize.authenticate();
console.log('Connection to the database has been established successfully.');