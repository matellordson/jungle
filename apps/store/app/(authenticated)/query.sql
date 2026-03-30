-- Orders table
CREATE TABLE orders (
  id          SERIAL PRIMARY KEY,
  customer_id INT,
  status      VARCHAR(20) NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'completed', 'refunded', 'cancelled')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table (links orders to products)
CREATE TABLE order_items (
  id          SERIAL PRIMARY KEY,
  order_id    INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  INT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity    INT NOT NULL CHECK (quantity > 0),
  unit_price  NUMERIC(10, 2) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast dashboard queries
CREATE INDEX idx_orders_created_at   ON orders(created_at);
CREATE INDEX idx_orders_status       ON orders(status);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_order_items_order   ON order_items(order_id);