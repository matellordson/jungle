import { Suspense } from "react";
import ProductList from "./components/ProductList";

export default async function ProductPage() {
  return (
    <Suspense fallback={"Loading..."}>
      <ProductList />
    </Suspense>
  );
}
