CREATE DATABASE IF NOT EXISTS task;

USE task;

CREATE TABLE IF NOT EXISTS example (
    id INT auto_increment,
    name VARCHAR(255),
    primary key (id)
);

ALTER TABLE example
ADD supplier_email VARCHAR(255),
ADD count INT,
ADD price DECIMAL(10, 2);

INSERT INTO example (name, supplier_email, count, price) VALUES
('Product A', 'supplier1@example.com', 10, 25.50),
('Product B', 'supplier2@example.com', 20, 35.75),
('Product C', 'supplier3@example.com', 15, 42.00),
('Product D', 'supplier4@example.com', 8, 18.90),
('Product E', 'supplier5@example.com', 12, 30.25),
('Product F', 'supplier6@example.com', 5, 10.99),
('Product G', 'supplier7@example.com', 18, 45.75),
('Product H', 'supplier8@example.com', 22, 55.00),
('Product I', 'supplier9@example.com', 14, 38.50),
('Product J', 'supplier10@example.com', 9, 22.75);
