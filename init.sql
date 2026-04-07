CREATE TABLE IF NOT EXISTS tasks (
  id     SERIAL PRIMARY KEY,
  name   TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);

INSERT INTO tasks (name, status) VALUES
  ('Milk',         'done'),
  ('Eggs',         'done'),
  ('Bread',        'pending'),
  ('Butter',       'pending'),
  ('Orange juice', 'pending');
  ('Tea',          'pending');
  ('Tea',          'pending');
  ('Tea',          'pending');
  ('Milk',         'done'),
  ('Eggs',         'done'),
  ('Bread',        'pending'),