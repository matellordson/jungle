"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";
import Logo from "./logo";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
`;

export function NavIcons() {
  return (
    <Wrapper>
      <Logo />

      {/* <Navigation>
        <ChevronLeft size={20} />
        <ChevronRight size={20} />
      </Navigation> */}
    </Wrapper>
  );
}
