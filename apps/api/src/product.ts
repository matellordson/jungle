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
    return await txn`SELECT * FROM products`;
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
      SELECT id, name, owner FROM products
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
  const { id, store, name, summary, categories, published } =
    await c.req.json();

  const newProduct = await withRLSContext(address, async (txn: any) => {
    // Get current user's ID
    const [user] = await txn`
      SELECT id FROM users WHERE wallet_address = ${address}
    `;

    if (!user) {
      throw new Error("User not found");
    }

    const [product] = await txn`
      INSERT INTO products (id, owner, store, name, summary, categories, published)
      VALUES (${id}, ${user.id}, ${store}, ${name}, ${summary}, ${categories}, ${published || false})
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
  const {
    store,
    name,
    summary,
    categories,
    published,
    image_url,
    details,
    variant,
    variantPrices,
  } = await c.req.json();

  const updatedProduct = await withRLSContext(address, async (txn: any) => {
    const [product] = await txn`
    UPDATE products
    SET 
      store = COALESCE(${store ?? null}, store),
      name = COALESCE(${name ?? null}, name),
      summary = COALESCE(${summary ?? null}, summary),
      categories = COALESCE(${categories ?? null}, categories),
      published = COALESCE(${published ?? null}, published),
      updated_at = NOW(),
      image_url = COALESCE(${image_url ?? null}, image_url),
      details = COALESCE(${details ?? null}, details),
      variant = COALESCE(${variant ?? null}, variant),
      variant_prices = COALESCE(${variantPrices ?? null}, variant_prices)
    WHERE id = ${productId}::uuid
    RETURNING *
  `;
    return product;
  }).catch((err) => {
    console.error("RLS/DB error:", err);
    return null;
  });

  if (!updatedProduct) {
    return c.json({ error: "Product not found or unauthorized" }, 404);
  }

  return c.json({ success: true, product: updatedProduct });
});

product.get("/:id/variant", async (c) => {
  const address = c.get("address");
  const productId = c.req.param("id");

  const getProductVariants = await withRLSContext(address, async (txn: any) => {
    const [variant] = await txn`
    SELECT variant FROM products WHERE id = ${productId}`;
    console.log(variant);
    return variant;
  });

  if (!getProductVariants) {
    return c.json({ error: "Product not found or unauthorized" }, 404);
  }

  return c.json({ success: true, variant: getProductVariants.variant });
});

// Delete product - RLS blocks if not owner
product.delete("/:id", async (c) => {
  const address = c.get("address");
  const productId = c.req.param("id");

  const deletedProduct = await withRLSContext(address, async (txn: any) => {
    const [product] = await txn`
      DELETE FROM products
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
