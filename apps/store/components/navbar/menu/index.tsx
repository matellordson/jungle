import MenuItems from "./items";
import { MenuTrigger } from "./reusable";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

const ItemWrapper = styled.div``;

export function Menu() {
  return (
    <Wrapper>
      <MenuTrigger
        title="View"
        items={
          <ItemWrapper>
            <MenuItems title="Image" />
            <MenuItems title="Detail" />
            <MenuItems title="Category" />
            <MenuItems title="Board" />
          </ItemWrapper>
        }
      />
      <MenuTrigger title="Filter" items={<p>View menu element</p>} />
    </Wrapper>
  );
}
