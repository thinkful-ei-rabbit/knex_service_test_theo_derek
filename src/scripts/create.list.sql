BEGIN;

DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery AS ENUM(
  'Main',
  'Snack',
  'Lunch',
  'Breakfast'
);

CREATE TABLE IF NOT EXISTS shopping_list (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  date_added TIMESTAMP DEFAULT now() NOT NULL,
  checked BOOLEAN DEFAULT false,
  catagory grocery NOT NULL
);

COMMIT;