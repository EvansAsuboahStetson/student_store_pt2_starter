CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  password    TEXT NOT NULL,
  username    TEXT NOT NULL UNIQUE,
  email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  name        TEXT NOT NULL,
  is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products(
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL,
  image       TEXT NOT NULL,
  description TEXT NOT NULL,
  price       BIGINT 
);

CREATE TABLE orders(
  id          SERIAL PRIMARY KEY,
  customer_id INT NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY(customer_id) REFERENCES users(id) ON Delete Cascade
);

CREATE TABLE order_details(
  order_id     INT NOT NULL,
  product_id  INT NOT NULL,
  quantity    INT default 1 NOT NULL,
  discount    INT,
  FOREIGN KEY(order_id) REFERENCES orders(id),
  FOREIGN KEY(product_id) REFERENCES products(id)  ON Delete Cascade ,
  PRIMARY KEY (order_id,product_id)

);



