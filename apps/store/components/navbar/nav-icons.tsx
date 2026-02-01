"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import styled from "styled-components";

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
      <Image
        src={"/logo.svg"}
        alt="logo"
        height={30}
        width={20}
        preload={true}
      />

      <Navigation>
        <ChevronLeft size={20} />
        <ChevronRight size={20} />
      </Navigation>
    </Wrapper>
  );
}
