-- Création de la table
CREATE TABLE IF NOT EXISTS sacem_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

-- Insertion des données
INSERT INTO sacem_products (name, description, price) VALUES
('Licence Standard', 'Utilisation non commerciale', 50.00),
('Licence Premium', 'Utilisation commerciale', 100.00),
('Licence Broadcast', 'Diffusion télé et radio', 200.00);
