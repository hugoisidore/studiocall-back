import express from "express";
import { initSwagger } from "./services/swagger.js";
import router from "./routers/index.router.js";
import cors from "cors";

const app = express();
// Inialize Swagger
initSwagger(app);

app.use(cors({
  origin: "http://localhost:3000"
}));

// Middleware JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

// Route for testing
app.get('/', (req, res) => {
  res.send('Hello StudioCall !!!!!!!');
});

export default app;