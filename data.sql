use ecommerce;

-- Insert sample products
INSERT INTO products (name, price, image) VALUES
('Organic Green Tea', 12.99, 'https://picsum.photos/id/101/300/200'),
('Handmade Mug', 18.50, 'https://picsum.photos/id/102/300/200'),
('Wireless Earbuds', 55.00, 'https://picsum.photos/id/103/300/200'),
('Notebook Journal', 9.99, 'https://picsum.photos/id/104/300/200');

-- Insert sample users
INSERT INTO users (name, email, password, salutation, country) VALUES
('Alice Tan', 'alice@example.com', 'hashedpassword1', 'Ms', 'Singapore'),
('Bob Lee', 'bob@example.com', 'hashedpassword2', 'Mr', 'Malaysia'),
('Charlie Lim', 'charlie@example.com', 'hashedpassword3', 'Mr', 'Indonesia');

-- Insert marketing preferences
INSERT INTO marketing_preferences (preference) VALUES
('Email Updates'),
('SMS Promotions'),
('Newsletter'),
('New Product Announcements');

-- Link users with marketing preferences
INSERT INTO user_marketing_preferences (user_id, preference_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 1),
(3, 4);

-- Insert cart items
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 1),
(3, 4, 3);

-- Insert orders
INSERT INTO orders (user_id, total, status, checkout_session_id) VALUES
(1, 81.99, 'completed', 'sess_abc123'),
(2, 18.50, 'pending', 'sess_def456'),
(3, 29.97, 'shipping', 'sess_ghi789');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 1),
(3, 4, 3);