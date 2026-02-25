"use client";

import styled from "styled-components";
import { useState } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";

const Wrapper = styled.div``;

const Actions = styled.div`
  margin-bottom: 10px;
  padding: 10px 0;
  display: flex;
  justify-content: end;
`;

const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 5px;

  & .active {
    color: var(--accent);
  }

  & .active:hover {
    color: var(--accent);
  }

  & svg {
    cursor: pointer;
    color: var(--mute-text);
  }

  & svg:hover {
    color: var(--svg-text);
  }
`;
const ProductWrapper = styled.div``;

interface ProductsProps {
  listView: React.ReactNode;
  gridView: React.ReactNode;
}

export function Products({ listView, gridView }: ProductsProps) {
  const [activeView, setView] = useState("list");

  return (
    <Wrapper>
      <Actions>
        <ViewToggle>
          <LayoutList
            size={20}
            className={activeView === "list" ? "active" : ""}
            onClick={() => setView("list")}
          />
          <LayoutGrid
            size={20}
            className={activeView === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          />
        </ViewToggle>
      </Actions>

      <ProductWrapper>
        {activeView === "list" ? listView : gridView}
      </ProductWrapper>
    </Wrapper>
  );
}
