import express from "express";
import { initSwagger } from "./services/swagger.js";

const app = express();
// Inialize Swagger
initSwagger(app);

// Middleware JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Route de base
app.get('/', (req, res) => {
  res.send('Hello StudioCall !!!!!!!');
});

export default app;