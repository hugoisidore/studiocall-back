import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { initSwagger } from "./services/swagger.js";
import router from "./routers/index.router.js";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

// Recréer __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Initialiser Swagger
initSwagger(app);

app.use(cors());

// Middleware JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurer le moteur de vue EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../studiocall-front/src/views")); // Met à jour l'emplacement du dossier des vues

// Configurer les fichiers statiques pour le frontend
app.use("/public", express.static(path.join(__dirname, "../../studiocall-front/src/public")));
app.use("/assets", express.static(path.join(__dirname, "../../studiocall-front/src/assets")));

// Configuration de l'endpoint pour envoyer l'email
app.post("/send-email", async (req, res) => {
  console.log("Données reçues:", req.body);

  const {
    formType,
    clientName,
    familyname,
    email,
    phone,
    installerName,
    studiocallInterName,
    address,
    zipCode,
    city,
    company,
    operator,
    fileReference,
    isClient,
    orderSummary,
    total,
    messageItems,
  } = req.body;

  // Parser messageItems s'il est reçu comme une chaîne
  const parsedMessageItems = typeof messageItems === 'string'
    ? JSON.parse(messageItems)
    : messageItems;

  // Définir les valeurs par défaut pour le sujet et le contenu
  let subject = '';
  let htmlContent = '';

  // Différenciation des 4 formulaires
  if (formType === "contactForm1") {
    // Formulaire 1 de contact
    subject = `Demande de Contact - ${familyname}`;

    htmlContent = `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">

    <!-- Header Section -->
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #d63384; font-size: 24px;">Demande de Contact</h2>
    </div>

    <!-- Client Information Section -->
    <div style="margin-bottom: 30px;">
      <h3 style="color: #333; font-size: 20px;">Informations du contact</h3>
      <div style="padding: 15px; background-color: #ffffff; border-radius: 8px; border: 1px solid #ddd;">
        <p><strong>Nom de la société:</strong> ${company}</p>
        <p><strong>Nom de famille:</strong> ${familyname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Statut client:</strong> ${isClient ? 'non' : 'oui'}</p>
      </div>
    </div>

    <!-- Footer Section -->
    <div style="text-align: center; margin-top: 30px; background-color: #d63384; color: #fff; padding: 15px; border-radius: 8px;">
      <p style="font-size: 14px;">Merci pour votre prise de contact. Nous reviendrons vers vous sous peu.</p>
    </div>

  </div>
`;

  } else if (formType === "contactForm2") {
    // Formulaire 2 de création de message standard
    subject = `Demande de Création de Message Standard de ${clientName}`;

    htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">

        <!-- Header Section -->
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #d63384; font-size: 24px;">Demande de Création de Message Standard</h2>
        </div>

        <!-- Client Information Section -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; font-size: 20px;">Informations du client</h3>
          <div style="padding: 15px; background-color: #ffffff; border-radius: 8px; border: 1px solid #ddd;">
            <p><strong>Nom et prénom:</strong> ${clientName}</p>
            <p><strong>Entreprise:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Référence dossier:</strong> ${fileReference}</p>
            <p><strong>Adresse postale:</strong> ${address}</p>
            <p><strong>Installateur:</strong> ${installerName}</p>
            <p><strong>Interlocuteur StudioCall:</strong> ${studiocallInterName}</p>
          </div>
        </div>

        <!-- Personalized Messages Section -->
        <div>
          <h3 style="color: #333; font-size: 20px;">Messages personnalisés</h3>
          <ul style="list-style-type: none; padding: 0;">
            ${parsedMessageItems.map(item => `
              <li style="background-color: #ffffff; padding: 15px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #ddd;">
                <p><strong>Numéro de message:</strong> Message ${item.counter || 'Inconnu'}</p>
                <p><strong>Type de message:</strong> ${item.checkboxText || 'Non défini'}</p>
                <p><strong>Musique:</strong> ${item.musicTitle || 'Aucune musique'}</p>
                <p><strong>Voix:</strong> ${item.voiceTitle || 'Aucune voix'}</p>
                <p><strong>Message personnalisé:</strong> ${item.textareaContent || 'Aucun texte saisi'}</p>
              </li>`).join('')}
          </ul>
        </div>

        <!-- Footer Section -->
        <div style="text-align: center; margin-top: 30px; background-color: #d63384; color: #fff; padding: 15px; border-radius: 8px;">
          <p style="font-size: 14px;">Merci pour votre demande. Nous reviendrons vers vous rapidement pour finaliser votre projet.</p>
        </div>

      </div>
    `;


  } else if (formType === "contactForm3") {
    // Formulaire 3 de création de message mobile
    subject = `Demande de Création de Message Mobile de ${clientName}`;
    htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">

        <!-- Header Section -->
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #d63384; font-size: 24px;">Demande de Création de Message Mobile</h2>
        </div>

        <!-- Client Information Section -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; font-size: 20px;">Informations du client</h3>
          <div style="padding: 15px; background-color: #ffffff; border-radius: 8px; border: 1px solid #ddd;">
            <p><strong>Nom et prénom:</strong> ${clientName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Opérateur:</strong> ${operator}</p>
            <p><strong>Adresse postale:</strong> ${address}</p>
            <p><strong>Code postal:</strong> ${zipCode}</p>
            <p><strong>Ville:</strong> ${city}</p>
            <p><strong>Interlocuteur StudioCall:</strong> ${studiocallInterName}</p>
          </div>
        </div>

        <!-- Personalized Messages Section -->
        <div>
          <h3 style="color: #333; font-size: 20px;">Messages personnalisés</h3>
          <ul style="list-style-type: none; padding: 0;">
            ${parsedMessageItems.map(item => `
              <li style="background-color: #ffffff; padding: 15px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #ddd;">
                <p><strong>Numéro de message:</strong> Message ${item.counter || 'Inconnu'}</p>
                <p><strong>Type de message:</strong> ${item.checkboxText || 'Non défini'}</p>
                <p><strong>Musique:</strong> ${item.musicTitle || 'Aucune musique'}</p>
                <p><strong>Voix:</strong> ${item.voiceTitle || 'Aucune voix'}</p>
                <p><strong>Message personnalisé:</strong> ${item.textareaContent || 'Aucun texte saisi'}</p>
              </li>`).join('')}
          </ul>
        </div>

        <!-- Footer Section -->
        <div style="text-align: center; margin-top: 30px; background-color: #d63384; color: #fff; padding: 15px; border-radius: 8px;">
          <p style="font-size: 14px;">Merci pour votre demande. Nous reviendrons vers vous rapidement pour finaliser votre projet.</p>
        </div>

      </div>
    `;
  } else if (formType === "contactForm4") {
    // Formulaire 4 de confirmation de message SACEM
    subject = `Confirmation de commande - ${clientName}`;
    htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">

    <!-- Header Section -->
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #d63384; font-size: 24px;">Confirmation de votre commande</h2>
    </div>

    <!-- Client Information Section -->
    <div style="margin-bottom: 30px;">
      <h3 style="color: #333; font-size: 20px;">Informations du client</h3>
      <div style="padding: 15px; background-color: #ffffff; border-radius: 8px; border: 1px solid #ddd;">
        <p><strong>Nom et Prénom :</strong> ${clientName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Entreprise :</strong> ${company}</p>
        <p><strong>Code postal :</strong> ${zipCode}</p>
      </div>
    </div>

    <!-- Order Summary Section -->
    <div>
      <h3 style="color: #333; font-size: 20px;">Résumé de la commande</h3>
      <ul style="list-style-type: none; padding: 0; margin: 10px 0;">
        ${orderSummary
        .split("<br>")
        .map(
          (item) =>
            `<li style="background-color: #ffffff; padding: 10px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #ddd; color: #555;">${item}</li>`
        )
        .join("")}
      </ul>
    </div>

    <!-- Total Section -->
    <div style="text-align: center; margin: 15px 0;">
      <p style="font-size: 1.1em; color: #333;">
        <strong>Total : ${total} € HT</strong>
      </p>
    </div>

    <!-- Separator -->
    <hr style="border: 1px solid #d63384; margin: 20px 0;">

    <!-- Footer Section -->
    <div style="text-align: center; margin-top: 20px; background-color: #d63384; color: #fff; padding: 15px; border-radius: 8px;">
      <p style="font-size: 14px;">
        Merci pour votre confiance. Nous reviendrons vers vous rapidement.
      </p>
    </div>

  </div>
    `;
  } else {
    return res.status(400).json({ message: "Type de formulaire inconnu." });
  }

  // Configure le transporteur Nodemailer
  const transporter = nodemailer.createTransport({
    host: "diego.o2switch.net",
    port: 465, // Port sécurisé SSL
    secure: true, // Connexion sécurisée SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    authMethod: "LOGIN",
    logger: true, // Activer le logger pour débogage
  });

  // Configuration de l'email
  const mailOptions = {
    from: email,
    to: `${email}, contact@studiocall.fr`, // email de destination
    subject,
    html: htmlContent,
  };

  // Envoi de l'email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message:
        "Votre demande a été envoyée avec succès ! Un de nos conseillers va prendre contact avec vous pour finaliser la demande.",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire", error);
    res.status(500).json({ message: "Erreur lors de l'envoi du formulaire" });
  }
});

app.use(router);

export default app;
