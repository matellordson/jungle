import { Metadata } from "next";
import styled from "styled-components";

const Wrapper = styled.div``;

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
  product_modal: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}
