CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  given_name TEXT,
  family_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);