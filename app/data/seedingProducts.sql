BEGIN;

INSERT INTO product (product_name, product_description, product_price, product_image, created_at) 
VALUES 
('Produit 1', 'Description du produit 1', 19.99, 'image1.png', DEFAULT),
('Produit 2', 'Description du produit 2', 29.99, 'image2.png', DEFAULT),
('Produit 3', 'Description du produit 3', 39.99, 'image3.png', DEFAULT),
('Produit 4', 'Description du produit 4', 49.99, 'image4.png', DEFAULT),
('Produit 5', 'Description du produit 5', 59.99, 'image5.png', DEFAULT);

COMMIT;
