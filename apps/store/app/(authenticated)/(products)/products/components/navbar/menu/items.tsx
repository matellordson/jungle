import { MouseEventHandler } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--accent);
    color: var(--accent-bg-text);
  }
`;

const Title = styled.p``;

export default function MenuItems({
  title,
  onClick,
}: {
  title: string;
  onClick: MouseEventHandler;
}) {
  return (
    <Wrapper>
      <Title onClick={onClick}>{title}</Title>
    </Wrapper>
  );
}
