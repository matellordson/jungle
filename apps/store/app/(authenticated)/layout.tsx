import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
`;

const PageWrapper = styled.div``;

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <PageWrapper>{children}</PageWrapper>
    </Wrapper>
  );
}
