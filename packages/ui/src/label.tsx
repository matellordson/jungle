import styled from "styled-components";

const LabelEL = styled.label`
  text-transform: uppercase;
  font-size: 15px;
`;

export function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string | undefined;
}) {
  return <LabelEL htmlFor={htmlFor}>{children}</LabelEL>;
}
