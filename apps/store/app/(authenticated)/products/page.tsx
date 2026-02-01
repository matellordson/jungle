import { Suspense } from "react";
import ProductGrid from "./components/ProductGrid";

export default async function ProductPage() {
  return (
    <Suspense fallback={"Loading..."}>
      <ProductGrid />
    </Suspense>
  );
}
