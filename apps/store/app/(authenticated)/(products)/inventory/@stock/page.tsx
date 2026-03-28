"use client";

import styled from "styled-components";
import "material-symbols";
import { useState } from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
} from "@floating-ui/react";
import { product } from "../product";

const Wrapper = styled.div`
  width: 100%;
`;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FilterWrapper = styled.div`
  border: var(--border);
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;

  &:hover {
    background-color: var(--highlight);
    cursor: pointer;
  }

  &.active {
    background-color: var(--foreground);
    color: var(--background);
  }
`;

const DropdownMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  border: var(--border);
  background-color: var(--background);
  z-index: 9999;
  min-width: 160px;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: var(--highlight);
  }

  &.active {
    background-color: var(--foreground);
    color: var(--background);
  }
`;

const StatusDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border: var(--border);
  background-color: ${({ color }) => color};
  flex-shrink: 0;
`;

const SortWrapper = styled.div`
  border: var(--border);
  display: flex;
  width: fit-content;
  padding: 5px;
`;

const SortItem = styled.div`
  width: fit-content;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);

  &:hover {
    background-color: var(--highlight);
  }

  &.active {
    background-color: var(--foreground);
    color: var(--background);
  }
`;

const StockWrapper = styled.div`
  margin-top: 10px;
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

type StockStatus = "low" | "ok" | "high" | "";

const FILTER_OPTIONS: { label: string; value: StockStatus; color: string }[] = [
  { label: "Low stock", value: "low", color: "var(--red-bg)" },
  { label: "OK stock", value: "ok", color: "var(--yellow-bg)" },
  { label: "High stock", value: "high", color: "var(--green-bg)" },
];

export default function Stocks() {
  const [activeSort, setActiveSort] = useState("asc");
  const [activeFilter, setActiveFilter] = useState<StockStatus>("");
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    strategy: "fixed",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const Sorts = [
    { name: "asc", icon: "arrow_upward" },
    { name: "desc", icon: "arrow_downward" },
  ];

  const getStockStatus = (item: (typeof product)[number]): StockStatus => {
    if (item.current_stock_count <= item.low_stock_count) return "low";
    if (
      item.current_stock_count <= item.high_stock_count &&
      item.current_stock_count >= item.low_stock_count
    )
      return "ok";
    if (item.current_stock_count >= item.high_stock_count) return "high";
    return "";
  };

  const filteredProducts = activeFilter
    ? product.filter((item) => getStockStatus(item) === activeFilter)
    : product;

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    activeSort === "asc"
      ? a.current_stock_count - b.current_stock_count
      : b.current_stock_count - a.current_stock_count,
  );

  const activeFilterLabel = FILTER_OPTIONS.find(
    (o) => o.value === activeFilter,
  )?.label;

  return (
    <Wrapper>
      <Action>
        <FilterWrapper
          ref={refs.setReference}
          className={activeFilter ? "active" : ""}
          {...getReferenceProps()}
        >
          <span className="material-symbols-sharp" style={{ fontSize: "16px" }}>
            filter_list
          </span>
          {activeFilterLabel ?? "filter"}
          {activeFilter && (
            <span
              className="material-symbols-sharp"
              style={{ fontSize: "14px", marginLeft: 2 }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFilter("");
              }}
            >
              close
            </span>
          )}
        </FilterWrapper>

        {isOpen && (
          <FloatingPortal>
            <DropdownMenu
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {FILTER_OPTIONS.map((option) => (
                <DropdownItem
                  key={option.value}
                  className={activeFilter === option.value ? "active" : ""}
                  onClick={() => {
                    setActiveFilter(option.value);
                    setIsOpen(false);
                  }}
                >
                  <StatusDot color={option.color} />
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </FloatingPortal>
        )}

        <SortWrapper>
          {Sorts.map((item) => (
            <SortItem
              key={item.name}
              className={activeSort === item.name ? "active" : ""}
              onClick={() => setActiveSort(item.name)}
            >
              <span className="material-symbols-sharp">{item.icon}</span>
            </SortItem>
          ))}
        </SortWrapper>
      </Action>

      <StockWrapper>
        {sortedProducts.length === 0 ? (
          <StockItem>
            <StockName>No products found</StockName>
          </StockItem>
        ) : (
          sortedProducts.map((item) => (
            <StockItem key={item.name}>
              <StockName>{item.name}</StockName>
              <StockCountWrapper>
                <StockCount>{item.current_stock_count}</StockCount>
                <StockColor
                  style={{
                    backgroundColor:
                      item.current_stock_count <= item.low_stock_count
                        ? "var(--red-bg)"
                        : item.current_stock_count <= item.high_stock_count &&
                            item.current_stock_count >= item.low_stock_count
                          ? "var(--yellow-bg)"
                          : "var(--green-bg)",
                  }}
                />
              </StockCountWrapper>
            </StockItem>
          ))
        )}
      </StockWrapper>
    </Wrapper>
  );
}
