CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  image TEXT,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bundles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  savings VARCHAR(50),
  image TEXT,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  slug VARCHAR(255),
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bundle_products (
  bundle_id INTEGER REFERENCES bundles(id),
  product_id INTEGER REFERENCES products(id),
  PRIMARY KEY (bundle_id, product_id)
); 