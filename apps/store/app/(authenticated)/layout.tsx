import { Navbar } from "@repo/ui/simple-nav";
import styled from "styled-components";

const Wrapper = styled.div``;

const PageWrapper = styled.div``;

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
