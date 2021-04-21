
-- CREATION OF THE DATABASE AND USER
CREATE DATABASE IF NOT EXISTS retail_app;
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

CREATE TABLE countries(
    id_ INT AUTO_INCREMENT NOT NULL,
    country_name VARCHAR(50) NOT NULL,
    shipping_cost FLOAT(2,2) NOT NULL,
    PRIMARY KEY (id_)
);

CREATE TABLE states(
    id_ INT AUTO_INCREMENT,
    state_name VARCHAR(50) NOT NULL,
    country_id INT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id_),
    PRIMARY KEY (id_)
);

CREATE TABLE cities(
    id_ INT AUTO_INCREMENT NOT NULL,
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

INSERT INTO countries(country_name, shipping_cost) VALUES
    ('Colombia', 0.05),
    ('Estados Unidos', 0.20),
    ('Republica Dominicana', 0.05),
    ('Brasil', 0.15),
    ('Canada', 0.20);

INSERT INTO states(state_name, country_id) VALUES
    ('Antioquia', 1),
    ('Norte de Santander', 1),
    ('Florida', 2),
    ('Pennsylvania', 2),
    ('Distrito Nacional', 3),
    ('Santiago', 3),
    ('Rio de Janeiro', 4),
    ('Parana', 4),
    ('Ontario', 5),
    ('Quebec', 5);

INSERT INTO cities(city_name, state_id) VALUES
    ('Medellin', 1),
    ('Sabaneta', 1),
    ('Cucuta', 2),
    ('Pamplona', 2),
    ('Orlando', 3),
    ('Miami', 3),
    ('Philadelphia', 4),
    ('Pittsburgh', 4),
    ('Santo Domingo', 5),
    ('Miraflores', 5),
    ('Santiago', 6),
    ('Tamboril', 6),
    ('Petropolis', 7),
    ('Rio de Janeiro', 7),
    ('Paranagua', 8),
    ('Tibagi', 8),
    ('Toronto', 9),
    ('Ottawa', 9),
    ('Quebec', 10),
    ('Montreal', 10);
