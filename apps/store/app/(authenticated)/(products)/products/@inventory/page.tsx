import styled from "styled-components";
import { Products } from "../components/products";

const Wrapper = styled.div`
  padding: 0px 15px;
`;

interface ProductsProps {
  view: "list" | "details";
}

export default function ProductPage({ view }: ProductsProps) {
  return (
    <Wrapper>
      <Products view={view == "list" ? "list" : "details"} />
    </Wrapper>
  );
}
