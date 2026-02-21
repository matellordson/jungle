import { Suspense } from "react";
import { Products } from "./components/Products";

export default async function ProductPage() {
  return (
    <Suspense fallback={"Loading..."}>
      <Products />
    </Suspense>
  );
}
