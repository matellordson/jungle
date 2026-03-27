"use client";

import styled from "styled-components";
import "material-symbols";
import { useState } from "react";
import { Input } from "@repo/ui/input";

const Wrapper = styled.div``;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const FilterWrapper = styled.div`
  border: var(--border);
  display: flex;
  width: fit-content;
`;

const FilterItem = styled.div`
  width: fit-content;
  padding: 3px 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:first-child) {
    border-left: var(--border);
  }

  &.active {
    background-color: var(--foreground);
    color: var(--background);
  }
`;

export default function Stocks() {
  const [activeFilter, setActiveFilter] = useState("no-filter");

  const filters = [
    {
      name: "no-filter",
      icon: "filter_alt_off",
    },
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
      {/* stocks page */}
    </Wrapper>
  );
}
