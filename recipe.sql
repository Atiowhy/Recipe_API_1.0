-- Active: 1689917925556@@147.139.210.135@5432@atio01@public
CREATE Table users(
    id SERIAL PRIMARY KEY,
    nama VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);

--add data--


INSERT INTO users(nama, email, password) VALUES('admin', 'admin@gmail.com', 'admin123');
INSERT INTO users(nama, email, password) VALUES('guest', 'guest@gmail.com', 'guest123');


--read data--
SELECT * FROM users;
ALTER Table users ALTER COLUMN id SET PRIMARY KEY;

--update data--
UPDATE users SET usia='3' WHERE nama='Jovin';
UPDATE users SET email='valen@gmail.com' WHERE nama='Valen';
UPDATE users SET email='sheilo@gmail.com' WHERE nama='Sheilo';
UPDATE users SET email='jovin@gmail.com' WHERE nama='Jovin';

DELETE FROM users WHERE id=2;
ALTER TABLE recipe DROP COLUMN category;

CREATE Table category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);
INSERT INTO category( name) VALUES('main course');
INSERT INTO category(name) VALUES('dessert');
INSERT INTO category(name) VALUES('appetizier');

ALTER Table recipe ADD COLUMN category_id INT;
UPDATE recipe SET category_id = 1 WHERE image='https://placehold.co/600x400';
ALTER Table recipe ALTER COLUMN category_id SET NOT NULL;
ALTER TABLE recipe ADD FOREIGN KEY (category_id) REFERENCES category(id);
CREATE TABLE recipe(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    ingridients VARCHAR NOT NULL,
    image VARCHAR NOT NULL
);

INSERT INTO recipe(title, ingridients, image, category_id) VALUES('Sambal goreng kentang', 'cabe, tomat, bawang putih, bawang merah, kentang', 'https://placehold.co/600x400', 1);
ALTER Table recipe ADD COLUMN users_id INT;
ALTER Table recipe ALTER COLUMN users_id SET NOT NULL;
UPDATE recipe SET users_id=2 WHERE image='https://placehold.co/600x400';
ALTER TABLE recipe ADD FOREIGN KEY (users_id) REFERENCES users(id);

SELECT * FROM users WHERE email = 'guest@gmail.com';