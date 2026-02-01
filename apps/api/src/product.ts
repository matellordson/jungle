import { Hono } from "hono";
import { getSession } from "../lib/session";
import sql, { withRLSContext } from "../lib/db";

type Variables = {
  address: string;
};

export const product = new Hono<{ Variables: Variables }>();

product.use("/*", async (c, next) => {
  const session = await getSession(c.req.raw, c.res as any);

  if (!session.isAuthenticated || !session.address) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("address", session.address);
  await next();
});

// PUBLIC: Everyone can see all products
product.get("/all", async (c) => {
  const products = await sql`
    SELECT * FROM get_all_products_public()
  `;

  return c.json(products);
});

// PRIVATE: Only see MY products (RLS enforced)
product.get("/mine", async (c) => {
  const address = c.get("address");

  const myProducts = await withRLSContext(address, async (txn: any) => {
    return await txn`SELECT * FROM product`;
  });

  return c.json(myProducts);
});

// Debug endpoint
product.get("/debug", async (c) => {
  const address = c.get("address");

  const result = await withRLSContext(address, async (txn: any) => {
    const [rlsContext] = await txn`
      SELECT current_setting('app.current_user_address', true) as rls_address
    `;

    const [currentUser] = await txn`
      SELECT current_wallet_address() as wallet_from_function
    `;

    const allProducts = await txn`
      SELECT id, name, owner_address FROM product
    `;

    const allUsers = await txn`
      SELECT id, wallet_address FROM users
    `;

    return {
      your_address: address,
      rls_context_set: rlsContext,
      function_returns: currentUser,
      all_products: allProducts,
      all_users: allUsers,
    };
  });

  return c.json(result);
});

// Create product
product.post("/create", async (c) => {
  const address = c.get("address");
  const { name, cover_image } = await c.req.json();

  const newProduct = await withRLSContext(address, async (txn: any) => {
    const [product] = await txn`
      INSERT INTO product (name, cover_image, owner_address)
      VALUES (${name}, ${cover_image}, ${address})
      RETURNING *
    `;
    return product;
  });

  return c.json({ success: true, product: newProduct });
});

// Update product - RLS blocks if not owner
product.put("/:id", async (c) => {
  const address = c.get("address");
  const productId = c.req.param("id");
  const { name, cover_image } = await c.req.json();

  const updatedProduct = await withRLSContext(address, async (txn: any) => {
    const [product] = await txn`
      UPDATE product
      SET name = ${name}, cover_image = ${cover_image}
      WHERE id = ${productId}
      RETURNING *
    `;
    return product;
  });

  if (!updatedProduct) {
    return c.json({ error: "Product not found or unauthorized" }, 404);
  }

  return c.json({ success: true, product: updatedProduct });
});

// Delete product - RLS blocks if not owner
product.delete("/:id", async (c) => {
  const address = c.get("address");
  const productId = c.req.param("id");

  const deletedProduct = await withRLSContext(address, async (txn: any) => {
    const [product] = await txn`
      DELETE FROM product
      WHERE id = ${productId}
      RETURNING *
    `;
    return product;
  });

  if (!deletedProduct) {
    return c.json({ error: "Product not found or unauthorized" }, 404);
  }

  return c.json({ success: true, message: "Product deleted" });
});
