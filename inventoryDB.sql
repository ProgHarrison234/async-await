DROP DATABASE IF EXISTS inventoryDB;

CREATE DATABASE inventoryDB;

USE inventoryDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item, price, quantity)
VALUES ("milk", 3.50, 50), ("soda", 2.75, 75), ("bread", 3.75, 25), ("candy", 1.00, 35);