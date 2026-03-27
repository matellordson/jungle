import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

export default function NewProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}
