-- Active: 1689402773234@@127.0.0.1@5432@recipe_b13@public
CREATE Table users(
    id SERIAL,
    nama VARCHAR NOT NULL,
    email TEXT,
    password TEXT
);

--add data--

INSERT INTO users(nama,usia,alamat,email)VALUES('Sheilo Askara','20','Jakarta Utara','atiowahyudi02@gmail.com');

--read data--
SELECT * FROM users;

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
UPDATE recipe SET category_id = 1 WHERE photo='https://placehold.co/600x400';
ALTER Table recipe ALTER COLUMN category_id SET NOT NULL;
ALTER TABLE recipe ADD FOREIGN KEY (category_id) REFERENCES category(id)