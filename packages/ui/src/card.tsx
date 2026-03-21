import styled from "styled-components";

const Wrapper = styled.div`
  border: var(--border);
  background-color: var(--background);
  width: 100%;
  padding: 10px;
  overflow: auto;
`;

export function Card({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: string;
}) {
  return (
    <Wrapper
      style={{
        height: height,
      }}
    >
      {children}
    </Wrapper>
  );
}
