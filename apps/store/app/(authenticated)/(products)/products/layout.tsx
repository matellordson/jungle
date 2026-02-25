import { Metadata } from "next";
import styled from "styled-components";

const Wrapper = styled.div``;

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductLayout({
  children,
  inventory,
  product_modal,
}: {
  children: React.ReactNode;
  inventory: React.ReactNode;
  product_modal: React.ReactNode;
}) {
  return (
    <Wrapper>
      {children}
      {inventory}
      {product_modal}
    </Wrapper>
  );
}
