"use client";

import styled from "styled-components";
import { NavIcons } from "./nav-icons";
import { Menu } from "./menu";

const Wrapper = styled.div`
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

export function Navbar() {
  return (
    <Wrapper>
      <NavIcons />
      <Menu />
    </Wrapper>
  );
}
