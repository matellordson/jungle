import { Navbar } from "@repo/ui/nav";
import styled from "styled-components";

const Wrapper = styled.div``;

const PageWrapper = styled.div`
  margin: 100px 0;
`;

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <Navbar />

      <PageWrapper>{children}</PageWrapper>
    </Wrapper>
  );
}
