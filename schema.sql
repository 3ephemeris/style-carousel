CREATE DATABASE clothing;
USE DATABASE clothing;

CREATE TABLE stock (
  productId serial PRIMARY KEY,
  name VARCHAR ( 40 )
);

CREATE TABLE quantity (
  quantityId serial PRIMARY KEY,
  xs INT,
  s INT,
  m INT,
  l INT,
  xl INT,
  xxl INT
)

CREATE TABLE styles (
  styleId serial PRIMARY KEY,
  styleName VARCHAR ( 40 ),
  price IN
)

CREATE TABLE products (
  FOREIGN KEY (productId)
    REFERENCES  stock (productId),
  FOREIGN KEY (styleId)
    REFERENCES styles (styleId)
);

CREATE TABLE users (
  userId serial PRIMARY KEY,
  username VARCHAR ( 20 ),
  email VARCHAR ( 30 )
);

CREATE TABLE bag (
  bagId serial PRIMARY KEY
  FOREIGN KEY (userId)
    REFERENCES  USERS (USERId),
  FOREIGN KEY (productId)
    REFERENCES  stock (productId),
  FOREIGN KEY (styleId)
    REFERENCES styles (styleId),
  size VARCHAR (5),
  amount INTEGER,
  calculatedPrice INTEGER
)