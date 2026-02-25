import { Navbar } from "../../components/navbar";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
`;

const PageWrapper = styled.div`
  padding: 0px 15px;
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
