import "dotenv/config";
import { Sequelize } from "sequelize";



// Create a new instance of Sequelize
export const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  logging: false,
});

// Test de connexion Sequelize

sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie !'))
  .catch(err => console.error('Erreur de connexion à la base de données :', err));
console.log('PG_URL:', process.env.PG_URL); 


export default sequelize;