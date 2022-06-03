-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/

-- uuidv4 will generate unique IDs for all users items carts and orders
-- POST /register will add values here
-- GET /users
-- GET /users/{id}
-- PUT /users/{id}
CREATE TABLE users (
    id varchar PRIMARY KEY,
    email varchar NOT NULL UNIQUE,
    username varchar NOT NULL UNIQUE,
    password varchar NOT NULL
);

-- POST /carts
CREATE TABLE carts (
    id varchar PRIMARY KEY,
    user_id varchar REFERENCES users(id)
);

-- POST /products
-- GET /products
-- GET /products/{id}
-- PUT /products/{id}
-- DELETE /products/{id}
CREATE TABLE items (
    id varchar PRIMARY KEY,
    name varchar(200) NOT NULL UNIQUE,
    category varchar NOT NULL,
    price money NOT NULL
);

-- POST /carts/{id}
-- DELETE /carts/{id}
-- GET /carts/{id}
-- : operations performed on cart items will parse item data from request body
-- : cart id extracted from URL params
CREATE TABLE cart_items (
    item_id varchar REFERENCES items(id),
    cart_id varchar REFERENCES carts(id)
);

-- POST /carts/{id}/checkout will add values here
-- : user id will be extracted from the session store
-- : cart id will be parsed from the URL parameter
-- : items array will be the result of a cart_items query
-- : items property will be appended to the order object and sent in response
CREATE TABLE orders (
    id varchar PRIMARY KEY,
    user_id varchar REFERENCES users(id),
    cart_id varchar REFERENCES carts(id) UNIQUE,
    total_price money NOT NULL
);


INSERT INTO users (id, email, username, password) VALUES 
  ('Jerry', 'jerry@example.com', 'jerryboy', 'password1'), 
  ('George', 'george@example.com', 'georgeboy', 'password2');
  