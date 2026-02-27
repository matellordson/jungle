import styled from "styled-components";
import { Products } from "../components/products";
import { ProductList } from "../components/products/ProductList";
import ProductGrid from "../components/products/ProductGrid";

const Wrapper = styled.div``;

export default function ProductPage() {
  return (
    <Wrapper>
      <Products listView={<ProductList />} gridView={<ProductGrid />} />
      <div
        style={{
          height: "200px",
          width: "700px",
          backgroundColor: "var(--highlight)",
          marginTop: "30px",
          // boxShadow: "0px 2px 10px #ece6e6",
          borderRadius: "10px",
        }}
      ></div>
    </Wrapper>
  );
}
