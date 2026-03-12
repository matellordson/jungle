"use client";

import { useState } from "react";
import { MenuItemsCheck } from "../components/navbar/menu/check-items";
import { MenuTrigger } from "../components/navbar/menu/trigger";
import { NavIcons } from "../components/navbar/nav-icons";
import ProductPage from "./page";
import styled from "styled-components";
import { MenuItemsLink } from "../components/navbar/menu/link-items";

const Wrapper = styled.div``;

const NavWrapper = styled.div`
  height: 40px;
  width: 100vw;
  background-color: var(--foreground);
  border-bottom: var(--border);
  display: flex;
  align-items: center;
  padding: 0px 15px;
  margin-bottom: 10px;
  gap: 5px;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
`;

const ItemWrapper = styled.div``;

export default function InventoryLayout() {
  const [productView, setProductView] = useState<"list" | "details">("list");

  return (
    <Wrapper>
      <NavWrapper>
        <NavIcons />
        <MenuWrapper>
          <MenuTrigger
            title="Edit"
            items={
              <ItemWrapper>
                <MenuItemsLink title="New..." link="/new-product/identity" />
              </ItemWrapper>
            }
          />

          <MenuTrigger
            title="View"
            items={
              <ItemWrapper>
                <MenuItemsCheck
                  title="List"
                  onClick={() => setProductView("list")}
                  active={productView == "list"}
                />
                <MenuItemsCheck
                  title="Detail"
                  onClick={() => setProductView("details")}
                  active={productView == "details"}
                />
              </ItemWrapper>
            }
          />

          <MenuTrigger title="Filter" items={<p>View menu element</p>} />
        </MenuWrapper>
      </NavWrapper>
      <ProductPage view={productView} />
    </Wrapper>
  );
}
