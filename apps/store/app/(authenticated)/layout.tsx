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
      <PageWrapper>{children}</PageWrapper>
    </Wrapper>
  );
}
