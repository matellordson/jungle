import styled from "styled-components";

const Wrapper = styled.a`
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font: inherit;
  color: inherit;

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

const Title = styled.p`
  font-size: 14px;
`;

export function MenuItemsLink({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <Wrapper href={link}>
      <Title>{title}</Title>
    </Wrapper>
  );
}
