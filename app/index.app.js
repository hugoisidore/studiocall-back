import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { initSwagger } from "./services/swagger.js";
import router from "./routers/index.router.js";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
app.use(
  "/public",
  express.static(path.join(__dirname, "../../studiocall-front/src/public"))
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../../studiocall-front/src/assets"))
);

// Configuration de l'endpoint pour envoyer l'email
app.post("/send-email", async (req, res) => {
  const {
    company,
    email,
    phone,
    formType,
    telephone,
    nom_interlocuteur,
    reference_dossier,
    nom_entreprise,
    adresse_postale,
    nom_installateur,
    nom_interlocuteur_studiocall,
    operator,
    adress,
    zip_code,
    town,
    orderSummary, // résumé de la commande
    total,
  } = req.body;

  // On configure le transporteur
  const transporter = nodemailer.createTransport({
    host: "diego.o2switch.net",
    port: 465, // Port sécurisé SSL
    secure: true, // Connexion sécurisée SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    authMethod: "LOGIN",
    logger: true, // Activer le logger pour le débogage
  });

  // Variables pour les emails à envoyer
  let subject;
  let text;
  let htmlContent;

  // Différenciantion des 3 formulaires
  if (formType === "contactForm1") {
    // Formulaire 1 de contact
    subject = `Test : Demande de Contact de ${company}`;
    text = `Nom de la Société : ${company}
    Nom de famille : ${req.body.familyname}
    Email : ${email}
    Téléphone : ${phone}
    Client : ${req.body.client}`;
  } else if (formType === "contactForm2") {
    // Formulaire 2 de création de message standard
    subject = `Test : Demande de Création de Message Standard de ${nom_entreprise}`;
    text = `Nom et Prénom : ${nom_interlocuteur}
    Email : ${email}
    Téléphone : ${telephone}
    Référence dossier : ${reference_dossier || "Non fourni"}
    Nom entreprise : ${nom_entreprise}
    Adresse postale : ${adresse_postale}
    Nom installateur : ${nom_installateur}
    Interlocuteur StudioCall : ${nom_interlocuteur_studiocall || "Non fourni"}`;
  } else if (formType === "contactForm3") {
    // Formulaire 3 de création de message mobile
    subject = `Test : Demande de Création de Message Mobile de ${nom_interlocuteur}`;
    text = `Nom et Prénom : ${nom_interlocuteur}
    Email : ${email}
    Téléphone : ${telephone}
    Opérateur : ${operator || "Non fourni"}
    Adresse postale : ${adress}
    Code postal : ${zip_code}
    Ville : ${town}
    Interlocuteur StudioCall : ${nom_interlocuteur_studiocall || "Non fourni"}`;
  } else if (formType === "contactForm4") {
    // Formulaire 4 de confirmation de message SACEM
    subject = `Confirmation de commande - ${nom_interlocuteur}`;
    htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d63384; text-align: center; font-size: 24px; margin-bottom: 10px;">Confirmation de votre commande</h2>
        <p style="margin: 5px 0;"><strong>Nom et Prénom :</strong> ${nom_interlocuteur}</p>
        <p style="margin: 5px 0;"><strong>Email :</strong> ${email}</p>
        <p style="margin: 5px 0;"><strong>Téléphone :</strong> ${phone}</p>
        <p style="margin: 5px 0;"><strong>Entreprise :</strong> ${company}</p>
        <p style="margin: 5px 0;"><strong>Code postal :</strong> ${zip_code}</p>
        
        <h3 style="color: #555; margin-top: 20px;">Résumé de la commande :</h3>
        <ul style="list-style-type: none; padding: 0; margin: 10px 0; font-size: 14px;">
          ${orderSummary
            .split("<br>")
            .map(
              (item) =>
                `<li style="padding: 4px 0; border-bottom: 1px solid #ddd;">${item}</li>`
            )
            .join("")}
        </ul>
        
        <p style="font-size: 1.1em; color: #333; text-align: center; margin: 15px 0;">
          <strong>Total : ${total} € HT</strong>
        </p>
        
        <hr style="border: 1px solid #d63384; margin: 20px 0;">
        
        <p style="color: #555; font-size: 14px; text-align: center;">
          Merci pour votre confiance. Nous reviendrons vers vous rapidement.
        </p>
      </div>
    `;
  } else {
    // Si aucun formType valide n'est trouvé
    return res.status(400).json({ message: "Type de formulaire inconnu." });
  }

  // Configuration de l'email
  const mailOptions = {
    from: email,
    to: `${email}, contact@studiocall.fr`, // email de destination
    subject,
  };

  if (htmlContent) {
    mailOptions.html = htmlContent; // Si on a défini un contenu HTML
  }

  if (text) {
    mailOptions.text = text; // Si on a défini un contenu texte brut
  }

  // Envoi de l'email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message:
        "Votre demande a été envoyée avec succès ! Un de nos conseillers va prendre contact avec vous pour finaliser la demande. ",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire", error);
    res.status(500).json({ message: "Erreur lors de l'envoi du formulaire" });
  }
});

app.use(router);

export default app;
