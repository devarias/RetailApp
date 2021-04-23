USE retail_app;

-- TABLES CREATION

CREATE TABLE IF NOT EXISTS users(
    id_ VARCHAR(36) NOT NULL DEFAULT (uuid()),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gov_id BIGINT UNIQUE NOT NULL,
    email VARCHAR(50) DEFAULT '',
    company VARCHAR(50) DEFAULT '',
    PRIMARY KEY (id_)
);

CREATE TABLE IF NOT EXISTS countries(
    id_ INT,
    country_name VARCHAR(50) NOT NULL,
    shipping_cost FLOAT(2,2) NOT NULL,
    PRIMARY KEY (id_)
);

CREATE TABLE IF NOT EXISTS states(
    id_ INT,
    state_name VARCHAR(50) NOT NULL,
    country_id INT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id_),
    PRIMARY KEY (id_)
);

CREATE TABLE IF NOT EXISTS cities(
    id_ INT,
    city_name VARCHAR(50) NOT NULL,
    state_id INT NOT NULL,
    FOREIGN KEY (state_id) REFERENCES states(id_),
    PRIMARY KEY (id_)
);


CREATE TABLE IF NOT EXISTS shippings(
    id_ INT AUTO_INCREMENT,
    user_id VARCHAR(36) NOT NULL,
    shipping_address VARCHAR(100) NOT NULL,
    country_id INT NOT NULL,
    state_id INT NOT NULL,
    city_id INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_),
    FOREIGN KEY (user_id) REFERENCES users(id_),
    FOREIGN KEY (country_id) REFERENCES countries(id_),
    FOREIGN KEY (state_id) REFERENCES states(id_),
    FOREIGN KEY (city_id) REFERENCES cities(id_)
);

CREATE TABLE IF NOT EXISTS orders(
    id_ INT AUTO_INCREMENT,
    order_date DATE DEFAULT (CURRENT_DATE),
    subtotal_amount BIGINT NOT NULL,
    paid BOOLEAN DEFAULT FALSE,
    user_id VARCHAR(36) NOT NULL,
    shipping_id INT NOT NULL,
    PRIMARY KEY (id_),
    FOREIGN KEY (user_id) REFERENCES users(id_),
    FOREIGN KEY (shipping_id) REFERENCES shippings(id_)
);

CREATE TABLE IF NOT EXISTS payments(
    id_ VARCHAR(36) DEFAULT (uuid()),
    order_id INT NOT NULL,
    payment_type VARCHAR(11) NOT NULL,
    total BIGINT NOT NULL,
    payment_date DATE DEFAULT (CURRENT_DATE),
    payment_status BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_),
    FOREIGN KEY (order_id) REFERENCES orders(id_)
);

INSERT INTO countries(id_, country_name, shipping_cost) VALUES
    (1, 'Colombia', 0.05),
    (2, 'Estados Unidos', 0.20),
    (3, 'Republica Dominicana', 0.05),
    (4, 'Brasil', 0.15),
    (5, 'Canada', 0.20);

INSERT INTO states(id_, state_name, country_id) VALUES
    (1, 'Antioquia', 1),
    (2, 'Norte de Santander', 1),
    (3, 'Florida', 2),
    (4, 'Pennsylvania', 2),
    (5, 'Distrito Nacional', 3),
    (6, 'Santiago', 3),
    (7, 'Rio de Janeiro', 4),
    (8, 'Parana', 4),
    (9, 'Ontario', 5),
    (10, 'Quebec', 5);

INSERT INTO cities(id_, city_name, state_id) VALUES
    (1, 'Medellin', 1),
    (2, 'Sabaneta', 1),
    (3, 'Cucuta', 2),
    (4, 'Pamplona', 2),
    (5, 'Orlando', 3),
    (6, 'Miami', 3),
    (7, 'Philadelphia', 4),
    (8, 'Pittsburgh', 4),
    (9, 'Santo Domingo', 5),
    (10, 'Miraflores', 5),
    (11, 'Santiago', 6),
    (12, 'Tamboril', 6),
    (13, 'Petropolis', 7),
    (14, 'Rio de Janeiro', 7),
    (15, 'Paranagua', 8),
    (16, 'Tibagi', 8),
    (17, 'Toronto', 9),
    (18, 'Ottawa', 9),
    (19, 'Quebec', 10),
    (20, 'Montreal', 10);
