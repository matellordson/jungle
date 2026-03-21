import { Metadata } from "next";
import styled from "styled-components";

const Wrapper = styled.div``;

export const metadata: Metadata = {
  title: "Inventory",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}
