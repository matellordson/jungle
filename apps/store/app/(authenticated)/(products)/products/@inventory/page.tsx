import styled from "styled-components";
import { Products } from "../components/products";
import { ProductList } from "../components/products/ProductList";
import ProductGrid from "../components/products/ProductGrid";

const Wrapper = styled.div``;

export default function ProductPage() {
  return (
    <Wrapper>
      <Products listView={<ProductList />} gridView={<ProductGrid />} />
    </Wrapper>
  );
}
