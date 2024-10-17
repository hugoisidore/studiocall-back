import express from "express";
import { initSwagger } from "./services/swagger.js";
import router from "./routers/index.router.js";

const app = express();
// Inialize Swagger
initSwagger(app);

// Middleware JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

// Route for testing
app.get('/', (req, res) => {
  res.send('Hello StudioCall !!!!!!!');
});

export default app;