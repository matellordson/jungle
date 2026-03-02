import { Check } from "lucide-react";
import { MouseEventHandler } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: var(--accent);
    color: var(--accent-bg-text);
  }

  &:hover svg {
    color: var(--accent-bg-text);
  }

  & svg {
    visibility: hidden;
  }

  .checked {
    visibility: visible;
  }
`;

const Title = styled.p``;

export default function MenuItems({
  title,
  onClick,
  active,
}: {
  title: string;
  onClick: MouseEventHandler;
  active: boolean;
}) {
  return (
    <Wrapper onClick={onClick}>
      <Check size={15} className={active ? "checked" : ""} />
      <Title>{title}</Title>
    </Wrapper>
  );
}
