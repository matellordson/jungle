import { Suspense } from "react";
import { Products } from "./components/Products";
import ProductGrid from "./components/ProductGrid";

export default async function ProductPage() {
  return (
    <Suspense fallback={"Loading..."}>
      <Products />
      {/* <ProductGrid /> */}
    </Suspense>
  );
}
