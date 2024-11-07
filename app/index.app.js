import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { initSwagger } from "./services/swagger.js";
import router from "./routers/index.router.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

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

// Configuration de l'endpoint pour envoyer l'email
app.post('/send-email', async (req, res) => {
    const { company, email, phone, message } = req.body;

    // Configuration du transporteur email pour o2switch
    let transporter = nodemailer.createTransport({
        host: 'ssl0.ovh.net',
        port: 465,
        secure: true, // Utilisez SSL
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS 
        },
        logger: true,   // Ajoute un logger pour afficher des informations détaillées
        debug: true 
    });

    // Configuration de l'email
    const mailOptions = {
        from: email,
        to: 'contact@studiocall.fr', // email de destination
        subject: `Nouveau message de ${company}`,
        text: `Nom de la Société: ${company}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`
    };

    // Envoi de l'email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email envoyé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
    }
});

app.use(router);

export default app;