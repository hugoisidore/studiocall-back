import express from "express";
import { initSwagger } from "./services/swagger.js";
import router from "./routers/index.router.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//Recréer __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Initialiser Swagger
initSwagger(app);

app.use(cors());

// Middleware JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configurer le moteur de vue EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../studiocall-front/src/views")); // Met à jour l'emplacement du dossier des vues

//Configurer les fichiers statiques pour le frontend
app.use('/public', express.static(path.join(__dirname, "../../studiocall-front/src/public")));
app.use('/assets', express.static(path.join(__dirname, "../../studiocall-front/src/assets")));

app.use(router);

export default app;