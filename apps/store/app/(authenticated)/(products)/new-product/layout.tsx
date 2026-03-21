import styled from "styled-components";
import { SimpleNavbar } from "@repo/ui/simple-nav";

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

export default function NewProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <SimpleNavbar />
      {children}
    </Wrapper>
  );
}
