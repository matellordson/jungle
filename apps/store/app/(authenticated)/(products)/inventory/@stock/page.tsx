"use client";

import styled from "styled-components";
import "material-symbols";
import { useState } from "react";
import { Input } from "@repo/ui/input";
import "material-symbols";
import { product } from "../product";

const Wrapper = styled.div`
  width: 100%;
`;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  width: 100%;
`;

const FilterWrapper = styled.div`
  border: var(--border);
  display: flex;
  width: fit-content;
  padding: 5px;
`;

const FilterItem = styled.div`
  width: fit-content;
  padding: 3px 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);

  &:not(:first-child) {
    border-left: var(--border);
  }

  &:hover {
    background-color: var(--highlight);
  }

  &.active {
    background-color: var(--foreground);
    color: var(--background);
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  border-bottom: var(--border);
  text-transform: uppercase;
`;

const TableHeaderItem = styled.div`
  color: var(--paragraph-color);
`;

const StockWrapper = styled.div`
  margin-top: 10px;
  height: 500px;
  overflow: auto;
`;

const StockItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  &:hover {
    background-color: var(--highlight);
  }
`;

const StockName = styled.p``;

const StockCountWrapper = styled.div`
  display: flex;
`;

const StockCount = styled.div`
  border: var(--border);
  padding: 3px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StockColor = styled.div`
  height: 30px;
  width: 15px;
  border-right: var(--border);
  border-top: var(--border);
  border-bottom: var(--border);
`;

export default function Stocks() {
  const [activeFilter, setActiveFilter] = useState("asc");

  const filters = [
    {
      name: "asc",
      icon: "arrow_upward",
    },
    {
      name: "desc",
      icon: "arrow_downward",
    },
  ];
  return (
    <Wrapper>
      <Action>
        <Input
          placeholder="Search"
          width="100%"
          height="35px"
          maxWidth="220px"
        />
        <FilterWrapper>
          {filters.map((item) => (
            <FilterItem
              className={activeFilter === item.name ? "active" : ""}
              onClick={() => {
                setActiveFilter(item.name);
              }}
            >
              <span className="material-symbols-sharp">{item.icon}</span>
            </FilterItem>
          ))}
        </FilterWrapper>
      </Action>

      <TableHeader>
        <TableHeaderItem>Product </TableHeaderItem>
        <TableHeaderItem>stock</TableHeaderItem>
      </TableHeader>
      <StockWrapper>
        {product.map((item) => (
          <StockItem>
            <StockName>{item.name}</StockName>
            <StockCountWrapper>
              <StockCount>{item.stock}</StockCount>
              <StockColor style={{ backgroundColor: `${item.color}` }} />
            </StockCountWrapper>
          </StockItem>
        ))}
      </StockWrapper>
    </Wrapper>
  );
}
